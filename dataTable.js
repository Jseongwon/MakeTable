'use strict'

export class DataTable {
    constructor() {

    }

    async init() {


        this.setNavStyleButtonClicked();
    }

    async update() {
        this.renderRows();

        this.renderNavButtons();
    }

    setDecideContentsLength(decideContetnsLength) {
        this.decideContetnsLength = decideContetnsLength;
    }

    setJSONData(jsonData) {
        this.configure = jsonData;
        this.columnLength = this.getColumnCount();
    }

    setTableElement(tableElement) {
        this.tableElement = tableElement;
    }

    setRowLength(rowLength) {
        this.rowLength = rowLength;
    }

    setPageLength(pageLength) {
        this.pageLength = pageLength;
    }

    setNavStyleButtonClicked() {
        let navStyleArea;

        navStyleArea = document.querySelector('.navStyle');
        navStyleArea.addEventListener('click', this.onNavButtonClicked);
    }

    movePage(currentPage) {
        this.currentPage = currentPage;
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
        // 1. 화면에 보여질 줄 수와 페이지 수를 정하는 UI를 만든다.
        if (isDecide == true) {
            // this.makeDecide();
        }

        // 2. 테이블의 필터 UI를 만든다
        if (isFilter == true) {
            // this.makeFilter();
        }
    }

    appendContentsRow(isHead = true, isFoot = true) {
        // 1. 테이블의 thead를 만든다.
        if (isHead == true) {
            this.makeTableHead();
        }

        // 2. 테이블의 tbody를 만든다.
        this.makeTableBody();

        // 3. 테이블의 tfoot를 만든다.
        if (isFoot == true) {
            this.makeTableFoot();
        }
    }

    appendPaginationRow(isPagination = true, isContentsInfo = false) {
        // 1. 테이블의 페이지 UI를 만든다.
        if (isPagination == true) {
            this.makePagination();
        }

        // 2. 내용의 정보를 보여주는 UI를 만든다.
        if (isContentsInfo == true) {
            // this.makeContentsInfo();
        }
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
        let startPageNumber = 1;
        let endPageNumber;
        let quotient;
        let remainder;
        let totalRowLengthRemainder;

        // 1. 페이지에 필요한 값들을 구한다. (입력 : 한 페이지의 최대 줄 수, 기능 : 페이지 개수 구함, 출력 : 페이지의 개수
        this.totalRowLength = this.configure.data.length;

        this.totalPageLength = (this.rowLength != 0) ? parseInt(this.totalRowLength / this.rowLength) : 0;

        totalRowLengthRemainder = this.totalRowLength % this.rowLength;

        // + 나머지가 있으면 페이지의 수를 하나 증가시킨다.
        (totalRowLengthRemainder > 0) ? this.totalPageLength++ : null;

        // 2. 페에지 이동 네비게이션 바의 총 개수를 구한다 pageLength
        // 2.1. 현재 페이지의 1의 자리수를 구한다.
        quotient = parseInt(this.currentPage / this.pageLength);
        remainder = this.currentPage % this.pageLength;

        // 2.2. 현재 페이지에 맞는 pageLength 단위의 시작 페이지번호를 구한다.
        // 나머지가 있을 땐
        // 시작 번호 = 몫 * 페이지수 + 1
        // 끝 번호 = (몫 + 1) * 페이지수
        startPageNumber = (quotient - 1) * this.pageLength + 1;

        endPageNumber = quotient * this.pageLength;
        if(remainder > 0) {
            startPageNumber = quotient * this.pageLength + 1;

            // 2.3. 현재 페이지에 맞는 pageLength 단위의 마지막 페이지 번호를 구한다.
            endPageNumber = (quotient + 1) * this.pageLength;
        }
        console.log(startPageNumber);
        console.log(this.currentPage);

        // 2.4. 페이지의 총 수보다 마지막 페이지 번호가 크면 마지막 페이지 번호는 페이지의 총 수이다.
        if (this.totalPageLength < endPageNumber) {
            endPageNumber = this.totalPageLength;
        }

        // 3. 네비게이션바를 렌더링 한다.
        // + 왼쪽 영역을 만든다.
        this.makeNavLeftArea();

        // + 가운데 영역인 페이지 번호를 만든다.
        this.makeNavMiddleArea(startPageNumber, endPageNumber);

        // + 오른쪽 영역을 만든다.
        this.makeNavRightArea();
    }

    makeRows(tbodyElement, jsonData) {
        let trElement;
        let itJson;

        let startRow;
        let endRow;
        let rowLength;

        startRow = (this.currentPage - 1) * this.rowLength;
        rowLength = startRow + this.rowLength;

        endRow = rowLength;
        if (rowLength > this.totalRowLength) {
            endRow = this.totalRowLength;
        }

        // 1. 줄 수만큼 반복한다.
        for (let i = startRow; i < rowLength; i++) {
            // 1.1. tr 태그를 만든다.
            trElement = document.createElement('tr');

            // 1.2. jsonData가 있으면
            if (i < endRow) {
                // 1.2.1. jsonData의 현재 배열을 읽는다.
                itJson = jsonData[i];

                // 1.2.2. 줄에서 적는다.
                this.recursiveWriteBodyInfo(trElement, itJson);
            }
            else{
                this.writeSpaceInfo(trElement);
            }
            // 1.3. tbody에 추가한다.
            tbodyElement.appendChild(trElement);
        }
    }

    renderRows() {
        // 1. tbody를 모두 삭제한다.
        this.tbodyElement.remove();

        // 2. 태그 tbody를 만든다.
        this.tbodyElement = document.createElement('tbody');

        // 3. 줄들을 추가한다.
        this.makeRows(this.tbodyElement, this.configure.data);

        // 4. 테이블에 tbody를 추가한다
        this.tableElement.appendChild(this.tbodyElement);
    }

    renderNavButtons() {
        let navQuickAreaParent;
        let navQuickArea;

        // 1. navStyle Element를 찾는다.
        navQuickArea = document.querySelector('.navStyle');
        navQuickAreaParent = navQuickArea.parentNode;

        // 2. navStyle를 삭제한다.
        navQuickArea.remove();

        // 3. navStyle 영역을 만든다.
        navQuickArea = document.createElement('tr');
        navQuickArea.className = 'navStyle';

        // 4. 원래 위치에 끼워 놓는다.
        navQuickAreaParent.appendChild(navQuickArea);

        console.log("NavButton Render!");

        // 5. 버튼들을 렌더링한다.
        this.makePagination();

        this.setNavStyleButtonClicked();
    }

    makeNavMiddleArea(startPageNumber, endPageNumber) {
        let navQuickArea;
        let navATagItem;
        let pageNumber;

        // 1. nav의 빠른 이동 영역을 찾는다.
        navQuickArea = document.querySelector('.navStyle');

        // 2. 시작 번호부터 마지막 번호까지 반복한다.
        for (let i = startPageNumber; i <= endPageNumber; i++) {
            pageNumber = String(i);

            // 2.1. nav의 페이지 번호 이동 버튼을 만든다.
            navATagItem = this.makeNavATagItem(pageNumber);
            navATagItem.innerText = pageNumber;

            // 2.2. nav의 가운데 영역에 추가한다.
            navQuickArea.appendChild(navATagItem);
        }
    }

    makeNavLeftArea() {
        let navQuickArea;
        let navATagItem;

        // 1. nav의 빠른 이동 영역을 찾는다.
        navQuickArea = document.querySelector('.navStyle');

        // 2. nav의 왼쪽 영역을 만든다.
        // ========================
        // 1. nav의 처음 이동 버튼을 만든다.
        navATagItem = this.makeNavATagItem('first');
        navATagItem.innerText = "<<";

        // 2. nav의 왼쪽 영역에 추가한다.
        navQuickArea.appendChild(navATagItem);

        // 3. nav의 이전 이동 버튼을 만든다.
        navATagItem = this.makeNavATagItem('previous');
        navATagItem.innerText = "<";

        // 4. nav의 왼쪽 영역에 추가한다.
        navQuickArea.appendChild(navATagItem);
    }

    makeNavRightArea() {
        let navQuickArea;
        let navATagItem;

        // 1. nav의 빠른 이동 영역을 찾는다.
        navQuickArea = document.querySelector('.navStyle');

        // 2. nav의 왼쪽 영역을 만든다. + float이 오른쪽 정렬이기에 오른쪽부터 순서대로 추가해야한다.
        // ========================
        // 1. nav의 마지막 이동 버튼을 만든다.
        navATagItem = this.makeNavATagItem('next');
        navATagItem.innerText = ">";

        // 2. nav의 오른쪽 영역에 추가한다.
        navQuickArea.appendChild(navATagItem);

        // 3. nav의 다음 이동 버튼을 만든다.
        navATagItem = this.makeNavATagItem('last');
        navATagItem.innerText = ">>";

        // 4. nav의 오른쪽 영역에 추가한다.
        navQuickArea.appendChild(navATagItem);
    }

    makeNavATagItem(identifier) {
        let navATagItem;
        // <a className="nav-page-item" id="nav-first-page" data-toggle="tab"
        //    role="tab" aria-controls="nav-first" aria-selected="true">
        //     <
        //     <
        // </a>

        navATagItem = document.createElement('a');

        navATagItem.setAttribute('class', 'nav-page-item');
        navATagItem.setAttribute('id', 'nav-page-' + identifier);
        navATagItem.setAttribute('data-toggle', 'tab');
        navATagItem.setAttribute('role', 'tab');
        navATagItem.setAttribute('aria-controls', 'nav-' + identifier);
        navATagItem.setAttribute('aria-selected', 'true');

        return navATagItem;
    }

    writeSpaceInfo(trElement) {
        let itElement;

        for(let i = 0; i < this.columnLength; i++){
            itElement = document.createElement('td');

            itElement.innerText = "ㅤ";

            trElement.appendChild(itElement);
        }
    }

    getColumnCount() {
        this.recursiveColumnCount.count = 0;
        this.recursiveColumnCount(this.configure.data[0]);
        return this.recursiveColumnCount.count;
    }

    recursiveColumnCount(jsonData) {
        let keys = Object.keys(jsonData);
        let key;
        let value;

        // 1. 태그 tr을 만들어서 추가한다.
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            value = jsonData[key];

            if (typeof value != "string") {
                this.recursiveColumnCount(value);
            } else {
                this.recursiveColumnCount.count++;
            }
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

            if (typeof value != "string") {
                this.recursiveWriteHeaderInfo(trElement, value);
            } else {
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

            if (typeof value != "string") {
                this.recursiveWriteBodyInfo(trElement, value);
            } else {
                itElement = document.createElement('td');

                itElement.innerText = value;

                trElement.appendChild(itElement);
            }
        }
    }

    onNavButtonClicked = (event) => {
        let target;
        let id;
        let idStrings;

        // 1. 현재 선택된 원소를 읽는다.
        target = event.target;

        // 2. 현재 선택된 원소의 id를 읽는다.
        id = target.id;

        // 3. id의 마지막 값을 추출한다.
        idStrings = id.split('-');
        if (idStrings.length <= 0) return;


        // 4. id의 마지막 값이 first이면
        if (idStrings[2] == 'first') {
            this.currentPage = 1;
        }
        // 5. id의 마지막 값이 previous이면
        else if (idStrings[2] == 'previous') {
            this.currentPage--;
            if (this.currentPage <= 0) {
                this.currentPage = 1;
            }
        }
        // 6. id의 마지막 값이 번호이면
        else if (isNaN(idStrings[2]) != true) {
            this.currentPage = parseInt(idStrings[2]);
        }
        // 7. id의 마지막 값이 next이면
        else if (idStrings[2] == 'next') {
            this.currentPage++;
            if (this.currentPage >= this.totalPageLength) {
                this.currentPage = this.totalPageLength;
            }
        }
        // 8. id의 마지막 값이 last이면
        else if (idStrings[2] == 'last') {
            this.currentPage = this.totalPageLength;
        }

        // 9. 줄을 랜더링한다.
        this.renderRows();

        this.renderNavButtons();
    }
}