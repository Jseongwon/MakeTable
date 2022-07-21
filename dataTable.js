'use strict'

export class DataTable {
    constructor() {

    }

    setDecideContentsLength(decideContetnsLength){
        this.decideContetnsLength = decideContetnsLength;
    }

    setJSONData(jsonData) {
        this.configure = jsonData;
    }

    setTableElement(tableElement) {
        this.tableElement = tableElement;
    }

    addHeadClass(className) {
        this.theadElement.classList.add(className);
    }

    addBodyClass(className) {
        this.tbodyElement.classList.add(className);
    }

    addFootClass(className) {
        this.tfootElement.classList.add(className);
    }

    appendFilteringRow(isDecide = true, isFilter = true) {

    }

    appendContentsRow(isHead = true, isFoot = true, isNavigation = true) {
        // 1. 테이블의 thead를 만든다.
        if(isHead == true){
            this.makeTableHead();
        }

        // 2. 테이블의 tbody를 만든다.
        this.makeTableBody();

        // 3. 테이블의 tfoot를 만든다.
        if(isFoot == true){
            this.makeTableFoot();
        }
    }

    appendPaginationRow(isContentsInfo = true, isPagination = true) {

    }

    makeTableHead() {
        let trElement;

        // 1. 태그 thead를 만든다.
        this.theadElement = document.createElement('thead');

        // 2. 줄을 만든다.
        trElement = document.createElement('tr');

        // 3. 줄에서 정보를 추가한다.
        this.recursiveWriteHeaderInfo(trElement, this.configure.data[0]);

        // 4. 테이블의 헤더에 줄을 추가한다.
        this.theadElement.appendChild(trElement);

        // 5. 테이블에 thead를 추가한다.
        this.tableElement.appendChild(this.theadElement);
    }

    makeTableBody() {
        // 1. 태그 tbody를 만든다.
        this.tbodyElement = document.createElement('tbody');

        // 2. 줄들을 추가한다.
        this.makeRows(this.tbodyElement, this.configure.data);

        // 3. 테이블에 tbody를 추가한다
        this.tableElement.appendChild(this.tbodyElement);
    }

    makeTableFoot() {
        let trElement;

        // 1. 태그 tfoot를 만든다.
        this.tfootElement = document.createElement('tfoot');

        // 2. 줄을 만든다
        trElement = document.createElement('tr');

        // 3. 줄에서 정보들을 추가한다.
        this.recursiveWriteHeaderInfo(trElement, this.configure.data[0]);

        // 4. 테이블의 foot 원소에 추가한다.
        this.tfootElement.appendChild(trElement);

        // 5. 테이블에 foot 원소를 추가한다.
        this.tableElement.appendChild(this.tfootElement);
    }

    makeDecideContentsLength() {

    }

    makeSearchWindow(isTop = true) {

    }

    makePagination() {
        // 1. 페이징 처리를 위한 하단 영역을 만든다.

    }

    makeRows(tbodyElement, jsonData) {
        let trElement;
        let itJson;

        // 1. jsonData의 개수만큼 반복한다.
        for (let i = 0; i < jsonData.length; i++){
            // 1.1. tr 태그를 만든다.
            trElement = document.createElement('tr');

            // 1.2. jsonData의 현재 배열을 읽는다.
            itJson = jsonData[i];

            // 1.3. 줄에서 적는다.
            this.recursiveWriteBodyInfo(trElement, itJson);

            // 1.4. tbody에 추가한다.
            tbodyElement.appendChild(trElement);
        }
    }

    recursiveWriteHeaderInfo(trElement, jsonData) {
        let itElement;
        let keys = Object.keys(jsonData);
        let key;
        let value;

        // 1. 태그 tr을 만들어서 추가한다.
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            value = jsonData[key];

            if(typeof value != "string"){
                this.recursiveWriteHeaderInfo(trElement, value);
            }
            else{
                itElement = document.createElement('th');

                itElement.innerText = key.toUpperCase();

                trElement.appendChild(itElement);
            }
        }
    }

    recursiveWriteBodyInfo(trElement, jsonData) {
        let itElement;
        let keys = Object.keys(jsonData);
        let key;
        let value;

        // 1. 태그 tr을 만들어서 추가한다.
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            value = jsonData[key];
            console.log(value);

            if(typeof value != "string"){
                this.recursiveWriteBodyInfo(trElement, value);
            }
            else{
                itElement = document.createElement('td');

                itElement.innerText = value;

                trElement.appendChild(itElement);
            }
        }
    }
}