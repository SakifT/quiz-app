import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'app-question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
    @Input() question: string;
    @Input() answers: string[];
    @Output() onAnswer = new EventEmitter<string>();
    constructor() {
        this.question = "default_question"
        this.answers = ["default_answer"];
    }
    ngOnInit(): void {
        console.log(this.answers)
    }
    onitemchange(value: string) {
        console.log(value);
        this.onAnswer.emit(value);
    }

}

