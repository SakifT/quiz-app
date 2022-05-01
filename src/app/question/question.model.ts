export class QuestionModel {
    question: string;
    answers: string[];
    correct_answer: number;
    constructor(question:string, answers:string[],correct_answer:number){
        this.question = question;
        this.answers = answers;
        this.correct_answer = correct_answer;
        
    }

}
