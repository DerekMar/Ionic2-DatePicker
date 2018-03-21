# Ionic2-DatePicker
基于移动混合开发框架Ionic2的 日期选择组件

# 特性
  最大特色：上下滑能够切换月份显示和星期显示，增加其它部分的布局控件；
  能够高亮自定义日期，并且月份和星期切换时，按照当前选择的日期为目标
  能够自定义触发事件，滑动事件、时间选择事件

# 属性
```
 <lightDatePicker [selected]="selectfunc" [curMonth]="month"  [curYear]="year"  [swipe]="swipefunc" (curMonthChange)="MonthChange($event)" (curYearChange)="YearChange($event)" [hightlightdata]='hightlightdata' #lightDatePicker></lightDatePicker> 
```
selected: 日期被选择事件
curMonth: 当前月份
curYear : 当前年份
swipe   : 滑动事件
curMonthChange: 月份变化事件
curYearChange : 年份变化事件
hightlightdata: 设置需要高亮的日期 ['2018-3-21', '2018-3-22'] 格式'year-month-day'

# 额外
    必须安装hammerj，且修改配置文件才能触发上下滑事件

