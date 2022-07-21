import {DataTable} from "./dataTable.js";

let targetElement;

let dataTable;
let promise;
let jsonData;

dataTable = new DataTable();

promise = await fetch("./userTable.json");

jsonData = await promise.json();

console.log(jsonData);
console.log(jsonData.data[0]);

dataTable.setJSONData(jsonData);

// 1. 타깃 엘리먼트를 찾는다.
targetElement = document.querySelector('#targetTable');

// 2. 타깃 엘리먼트를 설정한다.
dataTable.setTableElement(targetElement);

// 3. 테이블을 만든다.
dataTable.appendContentsRow();

// 4. head에 클래스를 추가한다.
dataTable.addHeadClass('table-dark');