const PAGES = { 
    PRODUCT: 'product', 
    VIEW: 'view',
};


const state = { 
    lists:[
    {name: "Tan", price: 0.99, url:"http://placekitten.com/150/150?image=1",qty:0, smallUrl: "http://placekitten.com/30/30?image=1"},
    {name: "Bei", price: 3.14, url:"http://placekitten.com/150/150?image=2",qty:0, smallUrl: "http://placekitten.com/30/30?image=2"},
    {name: "Lei", price: 2.73, url:"http://placekitten.com/150/150?image=3",qty:0, smallUrl: "http://placekitten.com/30/30?image=3"}
    ],
    page: PAGES.PRODUCT,
};

export {PAGES, state}
