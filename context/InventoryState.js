import InventoryContext from './InventoryContext'
import {useEffect, useState} from "react";
const InventoryState = (props) => {

  const host = "http://192.168.29.169:5001"
  const productInitial = []
  const [authToken, setAuthToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM')
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [product, setProducts] = useState(productInitial)
  const [status, setStatus] = useState()
  const [user, setUser] = useState()
  const [currentProduct, setCurrentProduct] = useState(productInitial)
  const [isSuccess, setIsSuccess] = useState()
  const [database, setDatabase] = useState(productInitial)
  const [prodName, setProdName] = useState()
  const [profit, setProfit] = useState()
  const [invoices, setInvoices] = useState(productInitial)
  const [analysis, setAnalysis] = useState(undefined)
  const [invoice, setInvoice] = useState(productInitial)

  useEffect(() => {
    if (status !== undefined) {
      const timeoutId = setTimeout(() => {
        setStatus(undefined); // Or any other desired value
      }, 2000);

      return () => clearTimeout(timeoutId); // Cleanup function to prevent memory leaks
    }
  },[status])

  //Auth
  const login = async (data) => {
    // console.log("adding a new product")

    // API Call
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify(data)
    });

    const json = await response.json()
    setAuthToken(json.authToken)
    if(response.status === 200) {
      setIsLogin(true)
    } else if (response.status === 400 ) {
      setIsLogin(false)
    }
    console.log(json.authToken)
  }

  const logout = () => {
    console.log("Logged out")
    setAuthToken(null)
    setIsLogin(false)
  }

  //Fetch All product
  const fetchProduct = async () => {
    setIsLoading(true)
    // API Call
    const response = await fetch(`${host}/api/inventory/fetchinventory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    // console.log(json)
    setProducts(json[0])
    setIsLoading(false)
  }

  //Get user
  const getUser = async () => {
     
    // API Call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    console.log(json)
    setUser(json)
  }

  //Get product by ID
  const getProductById = async (id) => {
    setIsLoading(true)
    // API Call
    const response = await fetch(`${host}/api/inventory/getproductbyid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    console.log(json)
    setCurrentProduct(json)
    setIsLoading(false)
  }

  //Add a product
  const addProduct = async (data) => {
    console.log(data)
    const product = [data]
    // setProducts(product.concat(product))

    // API Call
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(`${host}/api/inventory/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify(product)
    });
    if(response.status === 200) {
      setIsSuccess(true)
    } else if (response.status === 400 ) {
      setIsSuccess(false)
    }
    console.log(response)
  }



  //Delete a product
  const deleteProduct = async (id,data) => {
    const response = await fetch(`${host}/api/inventory/deleteproduct/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken,
      },
      body: JSON.stringify(data)
    });
    console.log(`Deleted product ${id}`)
    let newProducts = product.filter((product) => {return product._id !== id})
    const json = response.json();
    console.log(json)
  }

  // //Edit a product
  // const editProduct = async (id,title,description,tag) => {
  //   // API Call
  //   const response = await fetch(`${host}/api/product/updateproduct/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1M2UzNTQwODk2NzA2YTcyNzFlZjhkIn0sImlhdCI6MTY4MzIyMjQ5N30.a0dHD5-euIBobRHPuGksac2d3_nPIllk41cdx7js4c4',
  //     },
  //     body: JSON.stringify({title, description, tag})
  //   });
  //   const json = response.json();

  //   // Logic to edit in client
  //   for (let index = 0; index < product.length; index++) {
  //     const element = product[index];
  //     if (element.id === id) {
  //       element.title = title;
  //       element.description = description;
  //       element.tag = tag;
  //     }
  //   }
  // }

  //Fetch All product
  const fetchDatabase = async () => {
    // API Call
    const response = await fetch(`${host}/api/database/fetchdatabase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    console.log(json)
    setDatabase(json[0])
  }

  //Add a product to database
  const addProductToDB = async (data) => {
    // setIsLoading(true)
    // console.log("adding a new product to database")
    const product = data
    // setProducts(product.concat(product))

    // API Call
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(`${host}/api/database/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify(product),
    })
    setStatus(response.status)
    // setIsLoading(false)
  }

  //Get Product By Code
  const getProductByCode = async (code) => {
    setIsLoading(true)
    // API Call
    const response = await fetch(`${host}/api/database/getproductbycode/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    console.log(json)
    setProdName(json.name)
    setIsLoading(false)
    setStatus(response.status)
  }

  //Add an invoice
  const paymentComplete = async (data) => {
    setIsLoading(true)
    console.log("adding an invoice to database")
    const invoice = data
    console.log(invoice)
    // setProducts(product.concat(product))

    // API Call
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(`${host}/api/sale/saleinvoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify(invoice),
    })
    setIsLoading(false)
  }

  //Get profits
  const getProfits = async () => {
    // API Call
    const response = await fetch(`${host}/api/sale/getprofit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    // console.log(json)
    setProfit(json)
  }

  //Get all invoices
  const getAllInvoices = async () => {
    setIsLoading(true)
    // API Call
    const response = await fetch(`${host}/api/sale/getallinvoices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    // console.log(json)
    setInvoices(json)
    setIsLoading(false)
  }

  //Edit a product
  const updateStatus = async ( id, status ) => {
    // API Call
    const response = await fetch(`${host}/api/sale/updateinvoicestatus/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },  
      body: JSON.stringify({status: status})
    });
    const json = response.json();
    if (json) {
      console.log("updated")
    } 
  }

  const getSingleInvoice = async (id) => {
    setIsLoading(true)
    // API Call
    const response = await fetch(`${host}/api/sale/getinvoice/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    // console.log(json)
    setInvoice(json)
    setIsLoading(false)
  }

   //Get Analyse Invoices
   const getAnalysis = async () => {
    setIsLoading(true)
    // API Call
    const response = await fetch(`${host}/api/sale/analyseinvoices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });
    const json = await response.json()
    // console.log(json)
    setAnalysis(json)
    setIsLoading(false)
  }

  // //Edit a product
  // const userAdd = async ( status ) => {
  //   // API Call
  //   const response = await fetch(`${host}/api/customer/addcustomer`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': authToken,
  //     },  
  //     body: JSON.stringify({status: status})
  //   });
  //   const json = response.json();
  //   if (json) {
  //     console.log("updated")
  //   } 
  // }

  return(
    <InventoryContext.Provider value={{host,isLogin,isLoading,status,product,prodName,database,currentProduct,user,profit,invoices,invoice,analysis,authToken,isSuccess,getProductById,fetchProduct,getProductByCode,addProduct,addProductToDB,fetchDatabase,getUser,deleteProduct,paymentComplete, getProfits, getAllInvoices, updateStatus,getSingleInvoice,getAnalysis,login,logout}}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </InventoryContext.Provider>
  )
}

export default InventoryState;