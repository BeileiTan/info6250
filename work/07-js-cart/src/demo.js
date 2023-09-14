import { PAGES, state } from './state.js';
(function() {
    const appEl = document.querySelector('#app');

    function render(){
        if(state.page === PAGES.PRODUCT) {
            renderProduct();
            return;
          }
        if(state.page === PAGES.VIEW) { 
            renderView();
            return;
        }
    }


    function renderProduct(){
        const productPage = getProductHtml(state.lists);
        const countHtmls = state.lists.filter(filterByQty);
        let count = 0;
        countHtmls.map(countHtml => {
            count += Number((countHtml.qty));
        })
        if(countHtmls.length === 0){
            appEl.innerHTML = `
            <ul class="lists">
            ${productPage}
            </ul>
            <button class="page" type="button" data-target="view">View Cart</button>
            `;
        }else{
            appEl.innerHTML = `
            <ul class="lists">
            ${productPage}
            </ul>
            <button class="page" type="button" data-target="view">View Cart (${count}) </button>
            `;
        }
    }

    function renderView(){
        const productPage = getProductHtml(state.lists);
        const viewPage = getViewHtml(state.lists);
        const totalSum = getSumHtml(state.lists);
        const nothingHtml = state.lists.filter(filterByQty);
        if(nothingHtml.length === 0){
            appEl.innerHTML = `
            <ul class="lists">
            ${productPage}
            </ul>
            <p> Nothing in the cart </p>
            `;
        }else{
            appEl.innerHTML = `
            <ul class="lists">
            ${productPage}
            </ul>
            <div class="view">
            ${viewPage}
            ${totalSum}
            <button class="page" type="button" data-target="product">Hide Cart</button>
            <button class="checkout" type="button" data-target="product">Checkout</button>
            </div>
        `;
        }
    }

    function getProductHtml(lists){
        const productPage = lists.map((list, index) => `
            <li> 
                <span class="list" data-index="${index}">
                    <img src="${list.url}" alt="" class="src">
                    Name: ${list.name} Price: ${list.price}
                </span>
                <button data-index="${index}" class="add" type="button"> Add to Cart</button>
            </li>
            `).join('');
        return productPage;
    }

    function getSumHtml(lists){
        const filteredLists = lists.filter(filterByQty);
        let sum = 0;
        filteredLists.map(filteredList => {
            sum += Number((filteredList.qty * filteredList.price).toFixed(2));
        })
        const totalSum = `
        <p> Total cost of all cats: ${sum.toFixed(2)} </p>
        `;
        return totalSum;
    }

    function filterByQty(lists){
        if(lists.qty){
            return true;
        }else{
            return false;
        }
    }

    function getViewHtml(lists){
        const filteredLists = lists.filter(filterByQty);
        const viewPage = filteredLists.map((filteredList) => `
                <li> 
                    <span class="list">
                        <img src="${filteredList.smallUrl}" alt="" class="src">
                        Name: ${filteredList.name} Quantity: ${filteredList.qty} Total Price: ${(filteredList.qty * filteredList.price).toFixed(2)}
                    </span>
                    <button data-name="${filteredList.name}" class="addOne" type="button"> Add 1</button>
                    <button data-name="${filteredList.name}" class="deleteOne" type="button"> Delete 1</button>
                </li>
            `).join('');
        return viewPage;
    }

    appEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('add')){
            const index = e.target.dataset.index;
            state.lists[index].qty += 1;
            render();
            return;
        }
        if(e.target.classList.contains('addOne')){
            const curName = e.target.dataset.name;
            const object = state.lists.find(obj => obj.name === curName);
            object.qty += 1;
            render();
            return;
        }
        if(e.target.classList.contains('deleteOne')){
            const curName = e.target.dataset.name;
            const object = state.lists.find(obj => obj.name === curName);
            if(object.qty > 1){
                object.qty -= 1;
            }
            render();
            return;
        }
        if(e.target.classList.contains('checkout')){
            const filteredLists = state.lists.filter(filterByQty);
            filteredLists.map((filteredList) => {
                filteredList.qty = 0;
            })
            state.page = e.target.dataset.target;
            render();
            return;
        }
        if (e.target.classList.contains('page')) { 
            state.page = e.target.dataset.target;
            render();
            return;
        }
    })
    
    render();


})();