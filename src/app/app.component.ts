import { Component, Inject, OnInit } from '@angular/core';
import { mock_questions_list } from './question/mock_questions_list';
import { QuestionModel } from './question/question.model';
import { AngularFireDatabase } from 'angularfire2';
import { first, Observable } from 'rxjs';
import { Database, databaseInstance$ } from '@angular/fire/database';
import { inject } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'quiz-app';
  questions_list!: QuestionModel[];
  question!: QuestionModel;
  time: number = 60;
  timeLeft: number = this.time;
  interval: any;
  index!: number;
  correct: number = 0;
  done: boolean = false;
  percent: number= 0;

  constructor(private db:AngularFireDatabase) {
    
      db.list<QuestionModel>('sample').valueChanges().subscribe(questions=>{
        this.questions_list = questions;
        console.log(questions);
      })
   
  }

  ngOnInit(): void {
    this.question = this.questions_list[0];
    this.index = 0;
    this.startTimer()
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        alert("time is up!")
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  checkAnswer(value:any){
    console.log(value);
    if(value==this.question.answers[this.question.correct_answer]){
      this.correct++;
    }
    this.index = this.index+1;
    if (this.index>=this.questions_list.length){
      this.pauseTimer();
      this.done = true;
      this.percent = this.correct/this.questions_list.length;
      return;
    }
    this.question = this.questions_list[this.index];
  }
}
