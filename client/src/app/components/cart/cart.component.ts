import { Component, OnInit } from '@angular/core'
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderInfo, OrderService, ProductInfo } from 'src/app/services/order.service';
import { render } from 'creditcardpayments/creditCardPayments';


interface cartItem {
  product: Product
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  [x: string]: any;


  cart;
  total = 0
  cartItems: cartItem[] = [];
  cartSubscription: Subscription;
  modalRef: BsModalRef


  constructor(private cartSevice: CartService,
    private router : Router, 
    private productService: ProductService,
    private modalService : BsModalService,
    private orderService : OrderService) { 

      render(
        {
          id: "#paypal-button",
          currency: "INR",
          value: "100.00",
          onApprove: (details) => {
            alert("Transaction successfull");
          }
        }
      );
    }

  ngOnInit(): void {

  this.subcribeCart()

  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe()
  }

  subcribeCart() {
    let total = 0;
    this.cartSubscription = this.cartSevice.cartObservable.subscribe(
      {
        next: (cart) => {
          console.log(cart);
          let observables = []
          total = 0;
          if (Object.keys(cart).length == 0) {
            this.cartItems = []
          }
          for (let id in cart) {
            observables.push(
              this.productService.getProductById(id)
                .pipe(
                  map(product => {
                    total += (product.price * cart[id])
                    let item: cartItem = {
                      product: product,
                      quantity: cart[id]
                    }
                    return item
                  })
                )
            )
          }

          forkJoin(observables).subscribe({
            next: (cartItems: cartItem[]) => {
              this.total = total;
              this.cartItems = cartItems
            }
          })
        }
      }
    )
  }


  //open modal
  openModal(form){  
    this.modalRef = this.modalService.show(form ,
      {
        animated : true , 
        class : 'modal-lg'
      })
  }

  // checkout 
  checkOut(evnt : Event  , form : HTMLFormElement){
    evnt.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName')).value
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName')).value
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value
    

    let orderInfo : OrderInfo;
    let productInfos : ProductInfo[] = [];
    this.cartItems.forEach(e=>{
      productInfos.push({
        price : e.product.price , 
        productId : e.product._id , 
        quantity : e.quantity
      })
    })

    orderInfo = {
      address , 
      firstName , 
      lastName, 
      products : productInfos
    }
    console.log({
      orderInfo
    });

    this.orderService.placeOrder(orderInfo)
    .subscribe({
      next : (result)=>{
        this.modalRef.hide()
        this.cartSevice.clearCart()
        // this.router.navigate(['user-orders'])
      }, 
      error : (err)=>{
        console.log({'err' : 'Cant place order ..' })  
      }
    })

    return false;
    


  }


// paymentRequest: google.payments.api.PaymentDataRequest = {
//     apiVersion: 2,
//     apiVersionMinor: 0,
//     allowedPaymentMethods: [
//       {
//         type: 'CARD',
//         parameters: {
//           allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
//           allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
//         },
//         tokenizationSpecification: {
//           type: 'PAYMENT_GATEWAY',
//           parameters: {
//             gateway: 'example',
//             gatewayMerchantId: 'exampleGatewayMerchantId'
//           }
//         }
//       }
//     ],
//     merchantInfo: {
//       merchantId: '12345678901234567890',
//       merchantName: 'Demo Merchant'
//     },
//     transactionInfo: {
//       totalPriceStatus: 'FINAL',
//       totalPriceLabel: 'Total',
//       totalPrice: '0.1',
//       currencyCode: 'INR',
//       countryCode: 'BE'
//     },
//     callbackIntents: ['PAYMENT_AUTHORIZATION']
//   };

//   onLoadPaymentData = (
//     event: Event
//   ): void => {
//     const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
//     console.log('load payment data', eventDetail.detail);
//   }

//   onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
//     paymentData
//     ) => {
//       console.log('payment authorized', paymentData);
//       return {
//         transactionState: 'SUCCESS'
//       };
//     }

//   onError = (event: ErrorEvent): void => {
//     console.error('error', event.error);
//   }


}
