/**
 * mixin 函数 请已mx开头，用下划线链接，便于区分和混淆
 */
 import moment from 'moment'
 import staticMap from '@/modules/utils/static.js'
 
 export const methods = {
   mx_table_render(row, column, cellValue, index) {
     if (cellValue === 0 || cellValue) {
       return cellValue;
     } else {
       return '—'
     }
   },
   mx_table_static(key) {
     return function(row, column, cellValue) {
       let result = '—';
       try {
         result = staticMap[key][cellValue] || '—'
       } catch (error) {
         console.error('get key value error', error)
       }
       return result
     }
   },
   mx_table_date(row, column, cellValue) {
     if(cellValue) {
       return moment(cellValue).format('YYYY-MM-DD')
     } else {
       return '—'
     }
   },
   mx_table_check_result(startKey, key) {
     // 检查结果
     // startKey nv: 视力 optometry:refraction: 屈光 optometry:astigmatism: 散光
     return function (row, column, cellValue) {
       if (cellValue) {
         let arr = cellValue.filter(item => item.startsWith(startKey))
         let str = ''
         if (arr) {
           let strArr = []
           for (const item of arr) {
             let stt = _.get(staticMap, `${key}.${item}`);
             if (stt) {
               strArr.push(stt)
             }
           }
           str = strArr.join('、')
           str = str || '—'
         }
         return str;
       } else {
         return '—'
       }
     }
   }
 }