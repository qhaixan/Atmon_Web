<template>
<div class="scroll">
  <h3>Overall student attendances</h3>
  <div class="chart">
    <chart-axis :data='chartData'></chart-axis>
  </div>
  <h3>Subjects with most attendance</h3>
  <div v-show="showTable" style="display:flex;">
    <table style="margin-right:-1px;">
      <tr><th></th><th style="min-width:300px!important;">Subjects</th></tr>
      <tr class="list" v-for="(item,i) of subjectsDesc">
        <template v-if="item!=''">
          <td>{{i+1}}
          </td>
          <td>{{item}}
          </td>
        </template>
      </tr>
    </table>
    <table style="margin-left:0px;">
      <tr><th>Rate(%)</th></tr>
      <tr class="list" v-for="(item,i) of rates">
        <td>{{item}}
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import { svgArea, svgLine, svgScatter } from 'd2b'
import { ChartAxis } from 'vue-d2b'
import {
  studentRef
} from './../../firebase'
import {
  subjectRef
} from './../../firebase'
import {
  weekRef
} from './../../firebase'
export default {
  firebase: {
    students: studentRef.orderByChild('id'),
    subjects: subjectRef.orderByChild('id'),
    studentsObj: {
      source: studentRef,
      asObject: true
    },
    weeks: weekRef.orderByChild('index')
  },
  data() {
    return {
      //subjectsKey:[],
      test:".",
      subjectsDesc:[],
      rates:[],
      showTable:false,
      chartData: {
          sets: [
            {
              generators: [svgArea(), svgLine(), svgScatter()],
              graphs: [
                {
                  label: 'Current Semester',
                  values: [
                    {x: 5,  y: 0},
                    {x: 10, y: 0},
                    {x: 15, y: 0},
                    {x: 20, y: 0},
                    {x: 25, y: 0},
                    {x: 30, y: 0},
                    {x: 35, y: 0},
                    {x: 40, y: 0},
                    {x: 45, y: 0},
                    {x: 50, y: 0},
                    {x: 55, y: 0},
                    {x: 60, y: 0},
                    {x: 65, y: 0},
                    {x: 70, y: 0},
                    {x: 75, y: 0},
                    {x: 80, y: 0},
                    {x: 85, y: 0},
                    {x: 90, y: 0},
                    {x: 95, y: 0},
                    {x: 100, y: 0}
                  ]
                },
                {
                  label: 'Previous Semester',
                  values: [
                    {x: 5,  y: 0},
                    {x: 10, y: 0},
                    {x: 15, y: 0},
                    {x: 20, y: 0},
                    {x: 25, y: 0},
                    {x: 30, y: 0},
                    {x: 35, y: 0},
                    {x: 40, y: 0},
                    {x: 45, y: 0},
                    {x: 50, y: 0},
                    {x: 55, y: 0},
                    {x: 60, y: 0},
                    {x: 65, y: 2},
                    {x: 70, y: 2},
                    {x: 75, y: 7},
                    {x: 80, y: 9},
                    {x: 85, y: 14},
                    {x: 90, y: 2},
                    {x: 95, y: 2},
                    {x: 100, y: 1}
                  ]
                }
              ]
            }
          ]
        }
    }
  },
  components: {
    ChartAxis
  },
  methods: {
    tick() {
        this.getStudents()
    },
    insertGraph(rate){
      rate*=100
      if(rate<5)
      {
        this.chartData.sets[0].graphs[0].values[0].y+=1
      }else if(rate<10)
      {
        this.chartData.sets[0].graphs[0].values[1].y+=1
      }else if(rate<15)
      {
        this.chartData.sets[0].graphs[0].values[2].y+=1
      }else if(rate<20)
      {
        this.chartData.sets[0].graphs[0].values[3].y+=1
      }else if(rate<25)
      {
        this.chartData.sets[0].graphs[0].values[4].y+=1
      }else if(rate<30)
      {
        this.chartData.sets[0].graphs[0].values[5].y+=1
      }else if(rate<35)
      {
        this.chartData.sets[0].graphs[0].values[6].y+=1
      }else if(rate<40)
      {
        this.chartData.sets[0].graphs[0].values[7].y+=1
      }else if(rate<45)
      {
        this.chartData.sets[0].graphs[0].values[8].y+=1
      }else if(rate<50)
      {
        this.chartData.sets[0].graphs[0].values[9].y+=1
      }else if(rate<55)
      {
        this.chartData.sets[0].graphs[0].values[10].y+=1
      }else if(rate<60)
      {
        this.chartData.sets[0].graphs[0].values[11].y+=1
      }else if(rate<65)
      {
        this.chartData.sets[0].graphs[0].values[12].y+=1
      }else if(rate<70)
      {
        this.chartData.sets[0].graphs[0].values[13].y+=1
      }else if(rate<75)
      {
        this.chartData.sets[0].graphs[0].values[14].y+=1
      }else if(rate<80)
      {
        this.chartData.sets[0].graphs[0].values[15].y+=1
      }else if(rate<85)
      {
        this.chartData.sets[0].graphs[0].values[16].y+=1
      }else if(rate<90)
      {
        this.chartData.sets[0].graphs[0].values[17].y+=1
      }else if(rate<95)
      {
        this.chartData.sets[0].graphs[0].values[18].y+=1
      }else
      {
        this.chartData.sets[0].graphs[0].values[19].y+=1
      }
    },
    getStudents() {
      for(var i=0;i<20;i++)
      {
        this.chartData.sets[0].graphs[0].values[i].y=0
      }
      this.showTable=false;
      var subCount=this.subjects.length
      var stuCount=this.students.length

      var subjectsKey=[]
      var studentsKey=[]


      var subAttTotal=[]
      var subTotalHours=[]

      for(var i=0;i<subCount;i++)
      {
        subjectsKey[i]=this.subjects[i]['.key']
      }

      var randomAttRate=[]
      var randomSubKey=[]
      for(var i=0;i<stuCount;i++)
      {
        studentsKey[i]=this.students[i]['.key']
        var subKey=[]

        for(var j=0;j<Object.keys(this.students[i].sub).length;j++)
        {
          subKey[j]=Object.keys(this.students[i].sub)[j]
        }
        for(var j=0;j<subKey.length;j++)//loop once for student who take 1 subject
        {
          var classKey=[]
          var creditHours=0
          var MultipliedCH=0
          var attendedHours=0
          for(var k=0;k<Object.keys(this.students[i].sub[subKey[j]].class).length;k++)//loop twice for subject with 2 classes
          {
            classKey[k]=Object.keys(this.students[i].sub[subKey[j]].class)[k]
          }
          for(var k=0;k<classKey.length;k++)//(calculate CreditHours)
          {
            creditHours+=this.students[i].sub[subKey[j]].class[classKey[k]].hours
          }
          for(var k=0;k<classKey.length;k++)//(calculate total hours of 100%)
          {
            MultipliedCH = creditHours*(Object.keys(this.students[i].sub[subKey[j]].class[classKey[k]].weekly).length)
          }
          //this.test+=MultipliedCH
          for(var k=0;k<classKey.length;k++)//loop twice for subject with 2 classes (get attended times)
          {
            var wKey=[]
            for(var l=0;l<Object.keys(this.students[i].sub[subKey[j]].class[classKey[k]].weekly).length;l++)
            {
              wKey[l]=Object.keys(this.students[i].sub[subKey[j]].class[classKey[k]].weekly)[l]
            }
            for(var l=0;l<wKey.length;l++)
            {
              //this.test+=
              if(this.students[i].sub[subKey[j]].class[classKey[k]].weekly[wKey[l]].attended)
              {
                attendedHours+=this.students[i].sub[subKey[j]].class[classKey[k]].hours
              }
            }
          }
          randomSubKey[randomSubKey.length]=subKey[j]
          randomAttRate[randomAttRate.length]=attendedHours/MultipliedCH
          this.insertGraph(randomAttRate[randomAttRate.length-1])
          //this.test+=randomAttRate[randomAttRate.length-1]+"__"+randomSubKey[randomSubKey.length-1  ]

        }
      }

      var subRate=[]
      var subOccur=[]
      for(var i=0;i<subCount;i++)
      {
        subRate[i]=0
        subOccur[i]=0
      }
      for(var i=0;i<subCount;i++)
      {
        for(var j=0;j<randomSubKey.length;j++)
        {
          if(randomSubKey[j]==subjectsKey[i])
          {
            subOccur[i]+=1
            subRate[i]+=randomAttRate[j]
            //this.test+="<<<<"+subRate[i]+">>>>"
          }
        }
      }
      for(var i=0;i<subCount;i++)
      {
        if(subOccur[i]>0)
        {
          subRate[i]=parseFloat(Math.round((subRate[i]/subOccur[i] * 100) * 100) / 100).toFixed(2)
          //subRate[i]=subRate[i]/subOccur[i]
        }
      }
      for(var i=0;i<subCount;i++)
      {
        this.rates[i]=subRate[i]
        this.subjectsDesc[i]=this.subjects[i].id+" "+this.subjects[i].title
        //this.test+=this.subjects[i].title+"-"+subRate[i]
      }
      for(var i=0;i<(subCount);++i)
      {
        for(var j=i+1;j<(subCount);++j)
        {
          if(this.rates[j]>this.rates[i])
          {
            var temp = this.rates[i]
            var tempStr = this.subjectsDesc[i]

            this.rates[i]=this.rates[j]
            this.subjectsDesc[i]=this.subjectsDesc[j]

            this.rates[j]=temp
            this.subjectsDesc[j]=tempStr
          }
        }
      }
      /*
      for(var i=0;i<(subCount);i++)
      {
        for(var j=0;j<(subCount-i-1);j++)
        {
          if(this.rates[j]>this.rates[j+1])
          {
            var temp = this.rates[j]
            var tempStr = this.subjectsDesc[j]

            this.rates[j]=this.rates[j+1]
            this.subjectsDesc[j]=this.subjectsDesc[j+1]

            this.rates[j+1]=temp
            this.subjectsDesc[j+1]=tempStr
          }
        }
      }
      var j=subCount-1
      var i=0
      while(i<j)
      {
        var temp = this.rates[i]
        var tempStr = this.subjectsDesc[i]
        this.rates[i]=this.rates[j]
        this.subjectsDesc[i]=this.subjectsDesc[j]
        this.rates[j]=temp
        this.subjectsDesc[j]=tempStr
        i++
        j--
      }*/
      this.showTable=true;
    }
  },
  mounted() {
    this.tick()
    setInterval(this.tick.bind(this) , 1000)
  },
  computed: {
    nowload: function(){
      return function(){
        this.getStudents()
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
.chart{
    width: 100%;
    height: 500px;
  }
  .scroll {
    overflow-y: auto;
    height:         calc(100vh - 210px);
  }
  table {
    margin: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-collapse: collapse;
  }
  td, th {
    text-align: left;
    padding:5px;
    padding-left: 10px;
    padding-right: 10px;
  }
  th {
    background-color: #35435b;
    color: white;
  }
  .list:nth-child(even) {
    background-color: #cecece;
  }
  .list:nth-child(odd) {
    background-color: white;
  }
</style>
