'use strict'

export class DataTable {
    constructor() {

    }

    setJSONData(jsonData) {
        this.configure = jsonData;
    }

    setTableElement(tableElement) {
        this.tableElement = tableElement;
    }

    makeTable(isColumn = true) {
        // 1. 테이블의 열을 만들어야 하면 테이블의 열을 만든다.
        if(isColumn == true){
            this.makeTableHead();
        }

        // 2. 줄을 만든다.
        this.makeTableBody();
    }

    makeTableHead() {
        let theadElement;
        let trElement;

        // 1. 태그 thead를 만든다.
        theadElement = document.createElement('thead');

        // 2. 줄을 만든다.
        trElement = document.createElement('tr');

        // 3. 줄에서 정보를 추가한다.
        this.recursiveWriteHeaderInfo(trElement, this.configure.data[0]);

        // 4. 테이블의 헤더에 줄을 추가한다.
        theadElement.appendChild(trElement);

        // 5. 테이블에 thead를 추가한다.
        this.tableElement.appendChild(theadElement);
    }

    makeTableBody() {
        let tbodyElement;

        // 1. 태그 tbody를 만든다.
        tbodyElement = document.createElement('tbody');

        // 2. 줄들을 추가한다.
        this.makeRows(tbodyElement, this.configure.data);

        // 3. 테이블에 tbody를 추가한다
        this.tableElement.appendChild(tbodyElement);
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