import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ProximaNova from "/ProximaNova.ttf";
import ProximaNovaBlack from "/ProximaNovaSemiBold.ttf";
import moment from "moment/moment";

Font.register({ family: "ProximaNova", src: ProximaNova });
Font.register({ family: "ProximaNovaBlack", src: ProximaNovaBlack });

const GenSecCertPage = () => {
  let font_size = 11;
  let margin_top = 20;

  const options = [
    {
      value: "Secretary Certificate Waiver of Pre-emptive rights",
      label: "Secretary Certificate Waiver of Pre-emptive rights",
    },
    {
      value: "Secretary Certificate of no Dispute",
      label: "Secretary Certificate of no Dispute",
    },
    {
      value: "Secretary Certificate for List of Stockholders",
      label: "Secretary Certificate for List of Stockholders",
    },
    {
      value: "Secretary Certificate for Authorization",
      label: "Secretary Certificate for Authorization",
    },
  ];

  const stockHoldersInfo = {
    name: "Ma. Rona Bargo Po",
    nationality: "Filipino",
    no_of_subscribed_shares: "1,189,997",
    amount_of_subscribed_shares: "1,189,997.00",
    paidup_capital: "1,189,997.00",
    amount_of_paid_APIC: "-",
    total_amount_paid: "1,189,997.00",
  };

  const appointeeInfo = {
    name: "Juana Change",
    position: "IT Officer",
  };

  const initialData = {
    name: "Juan Dela Cruz",
    address: "711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401",
    company: "Company A",
    meeting_date: "2023-04-30",
    place_of_meeting:
      "Apt. 107 59676 Reichel Ways, West Cristopherport, VA 20121",
    increase_from: "ONE MILLION PESOS (PHP 1,000,000)",
    divided_into: "ONE MILLION SHARES (1,000,000)",
    par_value_of: "ONE PESO (PHP1.00)",
    par_value_to: "FIVE MILLION PESOS (PHP5,000,000.00)",
    par_value_divided_into: "FIVE MILLION SHARES (5,000,000)",
    principal_office:
      "Hobart Warehouse Cpd. Ph 2 Warehouse 23 Tiwala St Tiwala Borol 1st Balagtas 3016 Bulacan",
    as_of: "2024-07-23",
    stockHoldersInfo: [stockHoldersInfo, stockHoldersInfo, stockHoldersInfo],
    offices: "Converge",
    appointees: [],
    tax_id_number: "123-456-789-000",
  };

  const [formData, setFormData] = useState(initialData);
  const [appointeeData, setAppointeeData] = useState(appointeeInfo);

  const [selectedSecCertType, setSelectedSecCertType] = useState("");

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const preEmptiveRightsForm = () => {
    return (
      <>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Meeting Date <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.meeting_date}
            name="meeting_date"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Meeting Place <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.place_of_meeting}
            name="place_of_meeting"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Increase From <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.increase_from}
            name="increase_from"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Divided Into <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.divided_into}
            name="divided_into"
            onChange={handleOnChange}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value Each of <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_of}
            name="par_value_of"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value Each to <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_to}
            name="par_value_to"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value Each divided into{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_divided_into}
            name="par_value_divided_into"
            onChange={handleOnChange}
          />
        </label>
      </>
    );
  };

  const noDisputeForm = () => {
    return (
      <>
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Pricipal Office <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.principal_office}
            name="principal_office"
            onChange={handleOnChange}
          />
        </label> */}
      </>
    );
  };

  const listOfStockholdersForm = () => {
    return (
      <>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              As of <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.as_of}
            name="as_of"
            onChange={handleOnChange}
          />
        </label>
      </>
    );
  };

  const authorizationForm = () => {
    return (
      <>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Appointee <span className="text-red-500">*</span>
            </span>
          </div>
          <div className="flex flex-row gap-2 items-end">
            <div>
              <span>Name</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={appointeeData.name}
                name="name"
                onChange={(ev) => {
                  setAppointeeData({ ...appointeeData, name: ev.target.value });
                }}
              />
            </div>
            <div>
              <span>Position</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={appointeeData.position}
                name="position"
                onChange={(ev) => {
                  setAppointeeData({
                    ...appointeeData,
                    position: ev.target.value,
                  });
                }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                let newAppointees = [...formData.appointees, appointeeData];
                setFormData({ ...formData, appointees: newAppointees });
              }}
            >
              Add
            </button>
          </div>
        </label>
        <div className="flex flex-col gap-2">
          {formData.appointees.map((appointee, index) => {
            return (
              <div
                key={`appointee-${index}`}
                className="flex flex-row gap-2 w-full justify-between items-center"
              >
                <div className="flex flex-row gap-2">
                  <div>{index + 1}.</div>
                  <div>{appointee.name}</div>
                  <div>-</div>
                  <div>{appointee.position}</div>
                </div>
                <div
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    let updatedAppointees = formData.appointees.filter(
                      (_, idx) => index != idx
                    );
                    setFormData({ ...formData, appointees: updatedAppointees });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Pricipal Office <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.offices}
            name="offices"
            onChange={handleOnChange}
          />
        </label>
      </>
    );
  };

  const formatAppointees = (appointees) => {
    let text = "";
    if (appointees.length == 1) {
      text = `${appointees[0].name}, ${appointees[0].position}`;
    } else if (appointees.length == 2) {
      text = `${appointees[0].name}, ${appointees[0].position} and/or ${appointees[1].name}, ${appointees[1].position}`;
    } else {
      appointees.map((appointee, index) => {
        if (appointees.length - 1 == index) {
          text += `and/or ${appointee.name}, ${appointee.position}`;
        } else {
          text += ` ${appointee.name}, ${appointee.position}; `;
        }
      });
    }

    return text;
  };

  const getForm = (
    type = "Secretary Certificate Waiver of Pre-emptive rights"
  ) => {
    if (type == "Secretary Certificate of no Dispute") {
      return noDisputeForm();
    }
    if (type == "Secretary Certificate for List of Stockholders") {
      return listOfStockholdersForm();
    }
    if (type == "Secretary Certificate for Authorization") {
      return authorizationForm();
    }

    return preEmptiveRightsForm();
  };

  // Reference font
  const styles = StyleSheet.create({
    document: {
      fontFamily: "ProximaNova",
      fontSize: font_size,
    },
    table: {
      width: "14%",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      padding: "10px",
      fontSize: "10px",
    },
  });

  const preEmptiveRightsDocument = () => {
    return (
      <Document style={styles.document}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.8in 1in 0.5in 1in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                I, {formData.name}, of legal age, a resident of{" "}
                {formData.address}, being duly sworn, depose and state that:
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                I am the duly elected Corporate Secretary of {formData.company}.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                At a meeting held on{" "}
                {moment(formData.meeting_date).format("MMMM DD, YYYY")} at{" "}
                {formData.address}, the board of directors of the Corporation
                have approved the increase in the authorized capital stock of
                the Corporation from {formData.increase_from} divided into{" "}
                {formData.divided_into} with a par value each of{" "}
                {formData.par_value_of} to {formData.par_value_to} divided into{" "}
                {formData.par_value_divided_into}
                with a par value each of {formData.par_value_each}.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                In connection with the said increase of capital, I hereby
                certify that all non-subscribing stockholder(s) have waived
                their pre-emptive right(s) to subscribe.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                I further certify that from the time of such stockholders and
                directors' approval of the increase in capital stock up to the
                filing of the application for the increase of capital stock with
                the Commission, to the best of my knowledge, no action or
                proceeding has been filed or is pending before any Court
                involving an intra-corporate dispute and/or claim by any person
                or group against the Board of Directors, individual directors
                and/or major corporate officers of the Corporation as its duly
                elected and/or appointed directors or officers or vice versa.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                IN WITNESS WHEREOF, I have hereunto set my hand on this ____ of
                __________, ____ in ___________________, Philippines.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {formData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {formData.tax_id_number}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this ___________day of
                _________,_____ at _______________________ by the above-named
                person who exhibited to me his/her valid government
                identification card as indicated below his/her name.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const noDisputeDocument = () => {
    return (
      <Document style={styles.document}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.8in 1in 0.5in 1in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>
                I, {formData.name.toUpperCase()}, of legal age, Filipino with
                residence address at {formData.address}, after having been duly
                sworn to in accordance with law, do hereby depose and state
                that:
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
                gap: "10px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>1.</Text>
                <Text style={{ width: "100%" }}>
                  I am the Corporate Secretary of {formData.company} duly
                  organized and existing under and by virtue of the laws of the
                  Republic of the Philippines, with principal office at{" "}
                  {formData.principal_office}.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>2.</Text>
                <Text style={{ width: "100%" }}>
                  To the best of my knowledge, NO ACTION OR PROCEEDING has been
                  filed or is pending before any Court involving an
                  intra-corporate dispute and/or claim by any person or group
                  against the Board of Directors, individual directors and/or
                  major corporate officers of the Corporation as its duly
                  elected and/or appointed directors or officers or vice versa.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>3.</Text>
                <Text style={{ width: "100%" }}>
                  Further, no intra-corporate issue involving third parties is
                  pending, may it be Criminal, Civil, or Administrative.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                {/* IN WITNESS WHEREOF, I have hereunto set my hand on this ____ of
                __________, ____ in ___________________, Philippines.  */}
                IN WITNESS WHEREOF, I have hereunto set my hands this ____ day
                of ____________ {new Date().getFullYear()} at
                _______________________________________.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {formData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {formData.tax_id_number}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this ___________day of
                _________,_____ at _______________________ by the above-named
                person who exhibited to me his/her valid government
                identification card as indicated below his/her name.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: `${margin_top + 20}px`,
                textAlign: "right",
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                NOTARY PUBLIC
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const listOfStockholdersDocument = () => {
    return (
      <Document style={styles.document}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.5in 0.5in 0.9in 0.9in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>
                I, Ma. Rubi Bargo Po, of legal age, Filipino, a resident of 230
                Happy Homes Campo Sioco, Brgy. Ferdinand, Baguio City being duly
                sworn, depose and state that:
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
                gap: "10px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>1.</Text>
                <Text style={{ width: "100%" }}>
                  I am the duly elected and qualified Corporate Secretary of
                  Offshore Concept BPO Services Inc., a corporation duly
                  organized and existing under and by the virtue of the Republic
                  of the Philippines, with principal office at 2F 166C Military
                  Cut-off Road, Military Cut-off Brgy., Baguio City.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>2.</Text>
                <Text style={{ width: "100%" }}>
                  I am familiar with the facts herein certified and duly
                  authorized to Certify the List of the Shareholders as of
                  {moment(formData.as_of).format(" MMMM DD, yyyy")} are:
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text style={{ ...styles.table, width: "16%" }}>
                  Name of Stockholder
                </Text>
                <Text style={styles.table}>Nationality</Text>
                <Text style={styles.table}>Number of Subscribed Shares</Text>
                <Text style={styles.table}>
                  Amount of Subscribed Shares (Php)
                </Text>
                <Text style={styles.table}>Paid Up Capital</Text>
                <Text style={styles.table}>Amount of Paid APIC (Php)</Text>
                <Text
                  style={{
                    ...styles.table,
                    borderRight: "1px solid black",
                  }}
                >
                  Total Amount Paid (Php)
                </Text>
              </View>

              {formData.stockHoldersInfo.map((info, index) => {
                let style = {
                  display: "flex",
                  flexDirection: "row",
                };
                return (
                  <View
                    key={`info-${index}`}
                    style={
                      index == formData.stockHoldersInfo.length - 1
                        ? { ...style, borderBottom: "1px solid black" }
                        : style
                    }
                  >
                    <Text
                      style={{ ...styles.table, padding: "1px", width: "16%" }}
                    >
                      {info.name}
                    </Text>
                    <Text style={styles.table}>{info.nationality}</Text>
                    <Text style={styles.table}>
                      {info.no_of_subscribed_shares}
                    </Text>
                    <Text style={styles.table}>
                      {info.amount_of_subscribed_shares}
                    </Text>
                    <Text style={styles.table}>{info.paidup_capital}</Text>
                    <Text style={styles.table}>{info.amount_of_paid_APIC}</Text>
                    <Text
                      style={{
                        ...styles.table,
                        borderRight: "1px solid black",
                      }}
                    >
                      {info.total_amount_paid}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Page>

        <Page size={"A4"}>
          <View
            style={{
              padding: "0.5in 0.5in 0.9in 0.9in",
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                IN WITNESS WHEREOF, I have hereunto set my hands this ____ day
                of ____________ {new Date().getFullYear()} at
                _______________________________________.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {formData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {formData.tax_id_number}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this ___________day of
                _________,_____ at _______________________ by the above-named
                person who exhibited to me his/her valid government
                identification card as indicated below his/her name.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: `${margin_top + 20}px`,
                textAlign: "right",
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                NOTARY PUBLIC
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const authorizationDocument = () => {
    return (
      <Document style={styles.document}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.8in 1in 0.5in 1in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>
                I, {formData.name.toUpperCase()}, of legal age, Filipino, a
                resident of {formData.address} being duly sworn, depose and
                state that:
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
                gap: "10px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>1.</Text>
                <Text style={{ width: "100%" }}>
                  I am the duly elected and qualified Corporate Secretary of
                  {formData.company}, a corporation duly organized and existing
                  under and by virtue of the Republic of the Philippines, with
                  principal office at {formData.principal_office}.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>2.</Text>
                <Text style={{ width: "100%" }}>
                  That the annual/ a special meeting of the Board of Directors
                  held on August 29, 2023 , there being a quorum, the following
                  resolution was approved and passed.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                RESOLVED, as it resolved that the Board of Directors hereby
                appoint {formatAppointees(formData.appointees)} as the Point of
                Contact to transact, apply, submit, receive, sign for on behalf
                of the company in all {formData.offices} related transactions.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                RESOLVED FURTHER, to authorize, negotiate, secure, claim and
                receive from the above stated agency any and all documents
                related to the above mentioned power.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                RESOLVED FINALLY, to authorize the above-named person/s to
                perform such other acts and to execute and sign any and all
                documents necessary to the accomplishment of the above mentioned
                authority.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>UNANIMOUSLY APPROVED.</Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {formData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this _____day of
                ______________ {new Date().getFullYear()}, in _____________,
                Philippines.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                marginTop: `${margin_top + 20}px`,
                textAlign: "right",
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                NOTARY PUBLIC
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const getDocument = (
    type = "Secretary Certificate Waiver of Pre-emptive rights"
  ) => {
    if (type == "Secretary Certificate of no Dispute") {
      return noDisputeDocument();
    }
    if (type == "Secretary Certificate for List of Stockholders") {
      return listOfStockholdersDocument();
    }
    if (type == "Secretary Certificate for Authorization") {
      return authorizationDocument();
    }

    return preEmptiveRightsDocument();
  };

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-[25%] h-screen overflow-auto">
          <div className="flex flex-col p-5 items-center">
            <div className="flex flex-col bg-slate-200 w-full p-5 rounded-lg items-center">
              <div className="text-center py-5">Secretary Certificate</div>
              <div className="flex flex-col gap-2 w-full justify-center">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Secretary Certificate Type{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <Select
                    options={options}
                    onChange={(option) => {
                      setSelectedSecCertType(option.value);
                    }}
                  />
                </label>

                {getForm(selectedSecCertType)}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[75%] bg-gray-200 h-screen">
          <PDFViewer className="w-full h-screen p-5">
            {getDocument(selectedSecCertType)}
          </PDFViewer>
        </div>
      </div>
    </>
  );
};

export default GenSecCertPage;
