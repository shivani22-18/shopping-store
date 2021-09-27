import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories : Category[] = []
  category = ''

  constructor(private categoryService : CategoryService,
    private router : Router) { }

  ngOnInit(): void {
    this.collectAllCategory();
  }

  collectAllCategory(){
    this.categoryService.getAllCategories()
    .subscribe({
      next:(categories)=>{
        this.categories = categories
        // console.log(categories);
        
      }, 
      error : (responce : HttpErrorResponse)=>{
        console.log(responce);
      }
    })
  }

  categorySelected(category_id : string){
    console.log(category_id);
    this.category = category_id
    this.router.navigate([''] ,
     {
       queryParams : {
          'category' : category_id
       }
     })
  }
}
