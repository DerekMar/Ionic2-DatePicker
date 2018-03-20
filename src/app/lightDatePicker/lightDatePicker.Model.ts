export interface DateDay{
    time:number,
    week:number,
    month:number,
    year:number,
    isSelected:boolean,
    isToday:boolean,
    disable: boolean,
    cssClass:string
}
export interface DateWeek{
    time:number,
    month:number,
    year:number,
    isSelected:boolean,
    Day:Array<DateDay>,
    disable: boolean,
    isWeek:boolean
}
export class DateMouth{
    private time:number;
    private year:number;
    private weeks:Array<DateWeek>;
    private isSelected:boolean;
    private disable:boolean;
    private isMouth:boolean;
    private firstWeek: number;
    private daynum: number;

    constructor(time:number, year:number, weeks:Array<DateWeek>){
       this.Time = time;
       this.Year = year; 
       this.Weeks = weeks;
    }
    set Time(val:number){
        this.time = val;
    }
    get Time(){
        return this.time;
    }
    set Year(val:number){
        this.year = val;
    }
    get Year(){
        return this.year;
    }
    set Weeks(val:Array<DateWeek>){
        this.weeks = val;
    }
    get Weeks(){
        return this.weeks;
    }
    set FirstWeek(val){
        this.firstWeek = val;
    }
    get FirstWeek(){
        return this.firstWeek;
    }
    set DayNum(val){
        this.daynum = val;
    }
    get DayNum(){
        return this.daynum;
    }
}