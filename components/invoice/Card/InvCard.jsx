import React from 'react'
import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ToastAndroid, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";  
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";
import styles from './invcard.style'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from "moment";
import numWords from "num-words";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


const interstyles = {
  app: {
    flex: 1, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    // width: 400,
  },
  row: {
    flexDirection: "row"
  },
  "1col":  {
    flex:  1
  },
  "2col":  {
    flex:  2
  },
  "3col":  {
    flex:  3
  },
  "4col":  {
    flex:  4
  }
};


const InvCard = ({ data }) => {

	const Col = ({ numRows, children }) => {
		return  (
			<View style={interstyles[`${numRows}col`]}>{children}</View>
		)
	}
	
	const Row = ({ children }) => (
		<View style={interstyles.row}>{children}</View>
	)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data.status);
  const [error, setError] = useState(data.status);
  const [items, setItems] = useState([
    {label: 'Complete', value: 'complete'},
    {label: 'Incomplete', value: 'incomplete'}
  ]);

  useEffect(() => {
    console.log(value)
  },[value])

  const changeStatus = async (status) => {
    try {
        const response = await axios.request({
          method: 'POST',
          data: JSON.stringify({
            status: status.value
          }),
          url: `http://192.168.29.169:5001/api/sale/updateinvoicestatus/${data._id}`,
          params: {},
          headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
              'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log("status changes!")
          ToastAndroid.show(`Stats changed to: ${status.value}`,ToastAndroid.SHORT)
        } else {
            throw new Error('Error Occured');
        }
    } catch (error) {
        setError(error)
        console.log("Invoice not present: ", error);
    } finally {

    }
  }

  const generateInvoiceHTML = () => {
    
  
    return invoiceHTML;
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  const generatePDF = async () => {
    try {
      const invoiceHTML = `
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body {
                font-family: 'Poppins', sans-serif !important;
              }
              
              .clearfix {
                  clear: both;
              }
              
              body {
                  font-family: sans-serif;
                  margin: 0 auto;
                  font-size: 8px;
              }
              
              table
              {
                  table-layout:fixed;
                  /* width:100%; */
                  word-break: break-word;
              }
              
              h3 {
                  font-size: 14px;
              }
              
              th {
                  font-size: 8px;
              }
              
              td {
                  font-size: 10px;
              }
              
              p {
                  font-size: 10px;
              }
              
              .page-break {
                  page-break-after: always;
              }
              
              .allBorder {
                  border: 1px solid #000;
              }
              
              .topBorder {
                  border-top: 1px solid #000;
              }
              
              .bottomBorder {
                  border-bottom: 1px solid #000;
              }
              
              header .leftSection {
                  float: left;
                  width: 48%;
                  padding-right: 5%;
                  border-right: 1px solid black;
              }
              
              .address {
                  font-size: 12px;
              }
              
              header .leftSection h4 {
                  text-transform: uppercase;
                  margin-top: 0;
              }
              
              header .leftSection address {
                  font-style: normal;
                  font-size: 14px;
                  margin-top: -15px
              }
              
              header .rightSection {
                  float: left;
                  width: 45%;
              }
              
              header .rightSection label {
                  display: block;
                  font-weight: bold;
              }
              .tblRecipientRightSection {
                  font-size:13px;
              }
              .tblRecipientLeftSection {
                  font-size: 13px;
              }
              
              .ph_no {
                  font-size: 12px;
                  padding-left: 20px;
              }
              
              .billProductDetailsTable {
                  width: 100%;
                  font-size:12px;
              }
              
              .billProductDetailsTable thead th {
                  border-bottom: 1px solid #000;
                  border-left: 1px solid #000;
              }
              
              .billProductDetailsTable tbody td {
                  border-left: 1px solid #000;
                  /*padding: 7px;*/
              }
              
              .billProductDetailsTable thead th:first-of-type,
              .billProductDetailsTable tbody td:first-of-type {
                  border-left: none;
              }
              
              .itemDetailSection p {
                  font-size: 12px;
              }
              .terminologyLeftTable{
                  float:left;
                  height: 150px;
                  width: 50%;
                  border-right: 1px solid black;
                  border-bottom: 1px solid black;
              }
              .terminologyRightTable {
                  float:right;
                  height: 150px;
                  width: 50%;
                  border-bottom: 1px solid black;
              }
              .terminology {
                  margin-top: 15px;
              }
              
              .terminology table {
                  font-size: 15px;
              }
              
              .terminology table td:nth-of-type(even) {
                  width: 35%;
                  padding-left: 40px;
              }
              
              .terminology aside {
                  text-align: end;
                  padding: 0 30px 0px 0;
              }
              
              .terminology aside h5 {
                  font-weight: normal;
              }
              
              .medicalDetails {
                  margin-bottom: 15px;
              }
              
              .medicalDetails table {
                  width: 44%;
                  float: left;
              }
              
              .medicalDetails table td {
                  padding: 7px;
              }
              
              .medicalDetails table td:nth-of-type(odd) {
                  font-weight: bold;
              }
              
              .FooterPaging {
                  margin: 50px 0 0 700px;
                  text-align: right;
                  padding: 10px 30px;
                  width: 180px;
              }
              
              .uns-title {
                  font-weight: bold;
                  font-size: 14px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              
              .uns-title-address {
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              
              .buyer-address{
                  font-size: 0.8rem;
              }
              
              #bill {
                  padding-right: 10px;
                  padding-left: 10px;
                  width: 580px;
                  height: 800px;
              }
              
              .sign {
                  margin-top: 110px;
                  margin-bottom: 0;
              }
              
              .bank-details {
                  font-size: 12px;
                  margin: 0
              }
            </style>
          </head>
          <body>
            <div className="wholePrintBody page-break" id="bill" style={{marginBottom: 0}}>
              <header style={{marginTop: 125}}>
                <div className="allBorder">
                  <section className="leftSection ">
                    <p style={{margin: 5, fontSize: 14, fontWeight: 'bold'}}>OMKAR CREATIONS</p>
                    <p className="address" style={{margin: 5}}>
                      A-401 Prakriti Aprt, M.S. Road, Mittal Park,<br/>
                      Raghunath Nagar, Thane(W),<br/>
                      Dist.Thane-400604,Maharashtra
                    </p>
                    <p style={{margin: 5}}>
                      <b>Mob</b>
                      <label className="ph_no">8779674027</label>
                    </p>
                  </section>
                  <section className="rightSection ">
                    <table style={{margin: 5}}>
                      <tr>
                        <td>Invoice No.</td>
                        <td>
                          <label>Bill No</label>
                        </td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>
                          <label>${moment(new Date()).format('DD/MM/YYYY')}</label>
                        </td>
                      </tr>
                      <tr>
                        <td>GST No.</td>
                        <td>
                          <label>27AFFPV7912N1ZP</label>
                        </td>
                      </tr>
                    </table>
                  </section>
                  <div className="clearfix"></div>
                </div>
              </header>
              <br/>
              <main>
                <section className="medicalDetails allBorder">
                  <div>
                    <div style={{margin: 5, fontSize: 14, fontWeight: 'bold'}}>BUYER</div>
                    <div style={{fontWeight: 'bold', fontSize: 14, marginLeft: 5}}>${data.customer.name}</div>
                    <div className="buyer-address" style={{marginLeft: 5}}>
                      ${data.customer.email}<br/>
                      ${data.customer.phoneNumber}<br/>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </section>
                <section className="itemDetailSection allBorder">
                  <div>
                    <table cellSpacing="0" className="billProductDetailsTable bottomBorder">
                      <thead>
                        <tr>
                          <th rowSpan="2" colSpan="2">Sr. No.</th>
                          <th rowSpan="2" colSpan="5">Description</th>
                          <th rowSpan="2" colSpan="2">HSN Code</th>
                          <th rowSpan="2" colSpan="4">Rate</th>
                          <th rowSpan="2" colSpan="2">Quantity</th>
                          <th rowSpan="2" colSpan="4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${data.contents.map((product, index) => (
                          `<tr key={index}>
                            <td colSpan="2" style={{ borderBottom: '1px solid black' }}>${index + 1}</td>
                            <td colSpan="5" style={{ borderBottom: '1px solid black' }}><b>${product.productName}</b><br/>{product.productCode}</td>
                            <td colSpan="2" style={{ borderBottom: '1px solid black' }}></td>
                            <td colSpan="4" style={{ borderBottom: '1px solid black', textAlign: "right"}}>${product.price}</td>
                            <td colSpan="2" style={{ borderBottom: '1px solid black', textAlign: "center" }}>${product.qty}</td>
                            <td colSpan="4" style={{ borderBottom: '1px solid black', textAlign: "right"}}>${product.price * product.qty}</td>
                          </tr>`
                        ))}
                        
                        <tr>
                          <th colSpan="11"></th>
                          <th colSpan="4" style={{border: "1px solid black", borderBottom: "0px"}}>Taxable Amount</th>
                          <th colSpan="4" style={{border: "1px solid black", borderBottom: "0px", fontSize: "10px", textAlign: "right"}}>${data.taxable}</th>
                        </tr>
                        <tr>
                          <th colSpan="11"></th>
                          <th colSpan="4" style={{border: "1px solid black", borderBottom: "0px"}}>GST 18%</th>
                          <th colSpan="4" style={{border: "1px solid black", borderBottom: "0px", fontSize: "10px", textAlign: "right"}}>${data.gst}</th>
                        </tr>
                        <tr>
                          <th colSpan="11"></th>
                          <th colSpan="4" style={{border: "1px solid black", borderBottom: "0px"}}>Total</th>
                          <th colSpan="4" style={{border: "1px solid black", borderBottom: "0px", fontSize: "10px", textAlign: "right"}}>${data.total}</th>
                        </tr>
                      </tbody>

                    </table>
                    <p>Amount Chargable(in words): ${toTitleCase(numWords(data.total))}</p>
                  </div>
                  <div className="terminology topBorder">
                    <div>
                      <table className="terminologyLeftTable">
                        <h3 className="bank-details">Bank Details</h3>
                        <tr>
                          <td>Bank:</td>
                          <td colSpan={2}>Punjab & Sind Bank</td>
                        </tr>
                        <tr>
                          <td>Account No:</td>
                          <td colSpan={2}>1256985621245</td>
                        </tr>
                        <tr>
                          <td>Branch</td>
                          <td colSpan={2}>Thane Branch</td>
                        </tr>
                        <tr>
                          <td>IFSC Code</td>
                          <td colSpan={2}>PSB00045</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td colSpan={2}>Tulsi Shyam Teen Hath Naka, Thane(W), 400604</td>
                        </tr>
                      </table>
                      <table className="terminologyRightTable">
                        <p className="sign">
                          Omkar Creations <br/>
                          Authorized Signatory
                        </p>
                      </table>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </section>
              </main>
              <p style={{marginTop: 0}}>Declaration: * No Complaint regarding this bill will be entertained if not noticed in writing within 7 days.</p>
            </div>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({
        html: invoiceHTML
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <View style={{marginTop: 20}}>
      <View style={interstyles.app}>
        <Row>
          <Col numRows={1}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Qty: </Text>
              <Text style={styles.jobNameMain} numberOfLines={1}>{data.taxable}</Text>
            </View>
          </Col>
          <Col numRows={1}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>GST: </Text>
              <Text style={styles.jobNameMain} numberOfLines={1}>{data.gst}</Text>
            </View>
          </Col>
          <Col numRows={1}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Total: </Text>
              <Text style={styles.jobNameMain} numberOfLines={1}>{data.total}</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col numRows={3}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Status: </Text>
              <Text style={styles.jobNameMainEx} numberOfLines={1}>{data.type}</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col numRows={3}>
            <View style={styles.container}>
              <Text style={styles.jobName} numberOfLines={1}>Status: </Text>
              {/* <Text style={styles.jobNameMainEx} numberOfLines={1}>{data.status}</Text> */}
              <DropDownPicker
                style={{marginTop: 10}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={(item) => {changeStatus(item)}}
              />
            </View>
          </Col>
        </Row>
        <Row>
          <Col numRows={3}>
            <View style={{
              alignItems: "center"
            }}>
              <TouchableOpacity onPress={() => generatePDF()} style={{
                  marginTop: 20, 
                  borderRadius: 16, 
                  paddingTop: 16, 
                  paddingBottom: 16, 
                  backgroundColor: COLORS.tertiary,
                  alignItems: "center",
                  width: "50%"
                }}
              >
                <Text style={{
                  color: "white",
                  fontFamily: "",
                  fontSize: SIZES.large,
                  fontFamily: FONT.medium,
                  color: "#FFF",
                }}>Download</Text>
              </TouchableOpacity>
            </View>
          </Col>
        </Row>
      </View>
    </View>
  )
}

export default InvCard