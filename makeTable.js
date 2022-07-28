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
dataTable.setRowLength(5);
dataTable.setPageLength(5);
dataTable.movePage(1);

// 3. 테이블을 만든다.
// 5. 테이블을 만든다.
dataTable.appendContentsRow(true, false);

// 6. 페이지 이동 버튼들을 만든다.
dataTable.appendPaginationRow(true, false);

dataTable.init();

// 4. head에 클래스를 추가한다.
dataTable.addHeadClass('table-dark');

