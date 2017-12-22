const Common = {
    getFmtDate(timeStamp){
        const year = timeStamp.getFullYear(),
        　　month = timeStamp.getMonth() + 1,
        　　date = timeStamp.getDate()
        　　return "" + year + month + date;
    },

    /**
     * 
     * @param {string} type 类型：timestamp/date/fmtdate:20170512
     * @param {Date|number} value 值：日期对象或者时间戳数字
     * @param {Date|number} format 转换后的格式，可选： f1='12-02 13:26', f2='xx月xx日 星期x', f3="20171102"
     */
    getFmtTime(type, value, format){
        const weeks = {
            0: "日",
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六",
        };
        let year, month, day, week, hour, mins;
        let time = "";
        
        if(type == "fmtdate"){
            year = value.substr(0,4);
            month = value.substr(4, 2);
            day = value.substr(6, 2);

            const date = new Date(year+'/'+month+'/'+day);
            week = weeks[date.getDay()];
            if(format == "f2"){ //xx月xx日 星期x
                time = month+'月'+day+'日 星期'+week;
            }else if(format == "f3"){   //20171102
                time = ''+year+month+day;
            }
        }else{
            const date = (type=="date") ? value : new Date(parseInt(value));
            
            year = date.getFullYear();
            month = (date.getMonth()>9) ? date.getMonth()+1 : "0"+parseInt(date.getMonth()+1);
            day = (date.getDate()>10) ? date.getDate() : "0"+date.getDate();

            hour = (date.getHours()>10) ? date.getHours() : "0"+date.getHours();
            mins = (date.getMinutes()>10) ? date.getMinutes() : "0"+date.getMinutes();

            week = weeks[date.getDay()];

            if(format == "f1"){ //mm-dd hh:mm
                time = month+'-'+day+' '+hour+':'+mins;
            }else if(format == "f2"){ //xx月xx日 星期x
                time = month+'月'+day+'日 星期'+week;
            }else if(format == "f3"){   //20171102
                time = ''+year+month+day;
            }
        }
        return time;
    }
}


export default Common;