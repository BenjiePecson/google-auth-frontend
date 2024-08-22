import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  Document,
  View,
  Page,
  Text,
  Image,
  StyleSheet,
  Font,
  Svg,
  Line,
} from "@react-pdf/renderer";
import Select from "react-select";

import ProximaNova from "/ProximaNova.ttf";
import ProximaNovaBlack from "/ProximaNovaSemiBold.ttf";
import moment from "moment/moment";
import axios from "axios";

const GenNomPage = () => {
  const data = {
    companyName: "WESTITCH PHILIPPINES INC.",
    actual_meeting_date: new Date(),
    actual_meeting_time: "5:00 PM",
    confirmation_meeting_date: new Date(),
    confirmation_meeting_time: "5:00 PM",
    notice_meeting_date: new Date(),
    notice_meeting_time: "5:00 PM",
    place_of_meeting: "Video Conference",
    letterHeader: "",
    agendas: [],
    director: {
      name: "",
      position: "",
    },
    email: "test@fullsuite.ph",
    type_of_meeting: "Regular",
  };
  const [company, setCompany] = useState("");
  const [formData, setFormData] = useState(data);
  const [isPhysicalAddress, setIsPhysicalAddress] = useState(false);
  const [addAgenda, setAddAgenda] = useState("");
  const [letterHeader, setLetterHead] = useState(null);

  const place_of_meeting_options = [
    { value: "Video Conference", label: "Video Conference" },
    { value: "Teleconference", label: "Teleconference" },
    { value: "Physical Address", label: "Physical Address" },
  ];

  const list_of_agendas = [
    "Call to order",
    "Certifcation of Notice and quorum of the Meeting",
    "Approval of the Authorized Representatives to transact with the Bureau of Internal Revenue (BIR) and the Local Government Unit (LGU).",
    "Adjournment",
  ];

  const agenda_options = [
    { value: "Call to order", label: "Call to order" },
    {
      value: "Certifcation of Notice and quorum of the Meeting",
      label: "Certifcation of Notice and quorum of the Meeting",
    },
    {
      value:
        "Approval of the Authorized Representatives to transact with the Bureau of Internal Revenue (BIR) and the Local Government Unit (LGU).",
      label:
        "Approval of the Authorized Representatives to transact with the Bureau of Internal Revenue (BIR) and the Local Government Unit (LGU).",
    },
    { value: "Adjournment", label: "Adjournment" },
  ];

  const listOfDirectors = [
    {
      name: "ROVIMAE B. PO",
      current_residual_address:
        "330 HAPPY HOMES CAMPO SIOCO FERDINAND BAGUIO CITY",
      nationality: "FILIPINO",
      incorporator: "Y",
      board: " M",
      gender: "F",
      stock_holder: "Y",
      officer: "N/A",
      executive_committe: "N/A",
      tax_id_number: "429-981-055-000",
    },
    {
      name: "MA RONA PO",
      current_residual_address:
        "UPHO5 NT FLAIR TOWERS,RELIANCE ST. MANDALUYONG",
      nationality: "FILIPINO",
      incorporator: "Y",
      board: "C",
      gender: "F",
      stock_holder: "Y",
      officer: "PRESIDENT",
      executive_committe: "N/A",
      tax_id_number: "275-485-184-000",
    },
    {
      name: "MA. RUBI B. PO ",
      current_residual_address:
        "UNIT 1 BALLESTEROS TOWNHOMES BALLESTEROS ST. MANDALUYONG",
      nationality: "FILIPINO",
      incorporator: "Y",
      board: "M",
      gender: "F",
      stock_holder: "Y",
      officer: "N/A",
      executive_committe: "N/A",
      tax_id_number: "462-955-184-000",
    },
    {
      name: "CHRISTIAN ROVIC B. PO",
      current_residual_address:
        "330 HAPPY HOMES CAMPO SIOCO FERDINAND BAGUIO CITY",
      nationality: "FILIPINO",
      incorporator: "Y",
      board: "M",
      gender: "M",
      stock_holder: "Y",
      officer: "N/A",
      executive_committe: "N/A",
      tax_id_number: "100-625-906-000",
    },
    {
      name: "RODOLFO BARGO PO III",
      current_residual_address:
        "330 HAPPY HOMES CAMPO SIOCO FERDINAND BAGUIO CITY",
      nationality: "FILIPINO",
      incorporator: "N",
      board: "M",
      gender: "M",
      stock_holder: "Y",
      officer: "N/A",
      executive_committe: "N/A",
      tax_id_number: "496-880-660-000",
    },
    {
      name: "JIL ZULUETA",
      current_residual_address:
        "84-C LOWER MALVAR STREET,TRANCOVILLE, BAGUIO CITY",
      nationality: "FILIPINO",
      incorporator: "N",
      board: "",
      gender: "F",
      stock_holder: "N",
      officer: "TREASURER",
      executive_committe: "N/A",
      tax_id_number: "462-955-184-000",
    },
    {
      name: "ANGELA CUILAN",
      current_residual_address: "ACM 029 PARAPAD AMBIONG, LA TRINIDAD,BENGUET",
      nationality: "FILIPINO",
      incorporator: "N",
      board: "",
      gender: "F",
      stock_holder: "N",
      officer: "CORPORATE SECRETARY",
      executive_committe: "N/A",
      tax_id_number: "747-745-610-000",
    },
  ];

  const filteredListOfDirectors = listOfDirectors.map((director) => {
    return {
      name: director.name,
      position: director.officer,
    };
  });

  const directors_options = filteredListOfDirectors.map((director) => {
    return {
      value: { name: director.name, position: director.position },
      label: `${director.name} - ${director.position}`,
    };
  });

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Register font
  Font.register({ family: "ProximaNova", src: ProximaNova });
  Font.register({ family: "ProximaNovaBlack", src: ProximaNovaBlack });

  // Reference font
  const styles = StyleSheet.create({
    view: {
      fontFamily: "ProximaNova",
      fontSize: "12px",
    },
    title: {
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "black",
      padding: "0px 50px",
      margin: "20px 0px",
      fontFamily: "ProximaNovaBlack",
    },
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(formData);
  };

  const formatTime = (time) => {
    const hour = time.split(" ")[0].split(":")[0];
    const minute = time.split(" ")[0].split(":")[1];
    const timeConvention = time.split(" ")[1];

    return `${hour}:${minute} ${timeConvention}`;
  };

  const formatText = (inputString) => {
    // Split the string into words
    let words = inputString.toLowerCase().split(" ");

    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a single string and return
    return words.join(" ");
  };

  const fetchCompany = async () => {
    let response = await axios.get(
      "/company/91b147d4-6f29-4611-9ea4-4687ac116497"
    );
    setCompany(response.data[0]);
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <>
      <div className="p-5 flex flex-row items-center justify-center">
        <div className="bg-slate-200 w-1/2 rounded-lg p-5">
          <button
            className="btn btn-primary"
            onClick={async () => {
              let response = await axios.patch(
                "/company/e3ba2573-d758-4df9-9610-8ccbde61d6fb",
                { letterHeader: formData.letterHeader },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(response.data);
            }}
          >
            Click me
          </button>
          <form
            onSubmit={(ev) => {
              onSubmit(ev);
            }}
            className="flex flex-col gap-5"
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Letter Head</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                // onChange={(event) => {
                //   const selectedFile = event.target.files[0];
                //   if (selectedFile) {
                //     const reader = new FileReader();
                //     reader.onload = () => {
                //       const fileAsBlob = new Blob([reader.result], {
                //         type: selectedFile.type,
                //       });

                //       console.log(fileAsBlob);

                //       setFormData({ ...formData, letterHeader: fileAsBlob });

                //       // Create a URL for the Blob
                //       // const url = URL.createObjectURL(fileAsBlob);

                //       // setFormData({ ...formData, letterHeader: url });
                //     };
                //     reader.readAsArrayBuffer(selectedFile);
                //     // console.log(reader);
                //   }
                // }}
                onChange={async (event) => {
                  setFormData({
                    ...formData,
                    letterHeader: await convertBase64(event.target.files[0]),
                  });
                }}
              />
            </label>
            <img src={formData.letterHeader} alt="test" />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Actual Meeting Date</span>
              </div>
              <input
                type="datetime-local"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(ev) => {
                  const dateTime = new Date(ev.target.value);

                  setFormData({
                    ...formData,
                    actual_meeting_date: dateTime,
                    actual_meeting_time: formatTime(
                      dateTime.toLocaleTimeString()
                    ),
                  });
                }}
              />
            </label>
            <label className={`form-control w-full`}>
              <div className="label">
                <span className="label-text">Place of Meeting</span>
              </div>
              <Select
                options={place_of_meeting_options}
                onChange={({ value }) => {
                  if (value == place_of_meeting_options[2].value) {
                    setIsPhysicalAddress(true);
                  } else {
                    setFormData({
                      ...formData,
                      place_of_meeting: `via ${value}`,
                    });
                    setIsPhysicalAddress(false);
                  }
                }}
              />
            </label>
            <label
              className={`form-control w-full ${
                isPhysicalAddress ? "" : "hidden"
              }`}
            >
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(ev) => {
                  setFormData({
                    ...formData,
                    place_of_meeting: `in ${ev.target.value}`,
                  });
                }}
              />
            </label>
            <label className={`form-control w-full`}>
              <div className="label">
                <span className="label-text">Agendas</span>
              </div>
              <Select
                options={agenda_options}
                onChange={(selected) => {
                  const selectedAgenda = selected.map((value) => {
                    return value.value;
                  });

                  setFormData({ ...formData, agendas: selectedAgenda });
                }}
                isMulti={true}
              />
            </label>

            <label className={`form-control w-full`}>
              <div className="label">
                <span className="label-text">Agendas</span>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={addAgenda}
                  onChange={(ev) => {
                    setAddAgenda(ev.target.value);
                  }}
                />
                <button
                  className="btn btn-success"
                  onClick={() => {
                    let agenda = formData.agendas;
                    agenda.push(addAgenda);
                    setAddAgenda("");
                  }}
                >
                  Add
                </button>
              </div>
            </label>

            <div>
              <div className="flex flex-col gap-2 form-control">
                {list_of_agendas.map((agenda, index) => {
                  return (
                    <div
                      className="flex flex-row gap-3 items-center"
                      key={`agenda-${index}`}
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={agenda}
                        name={agenda}
                        onClick={(ev) => {
                          if (ev.target.checked) {
                            // setSelectedAgendas([...selectedAgendas, agenda]);
                            setFormData({
                              ...formData,
                              agendas: [...formData.agendas, agenda],
                            });
                          } else {
                            const selected_agendas = formData.agendas.filter(
                              (val) => val != ev.target.value
                            );
                            setFormData({
                              ...formData,
                              agendas: selected_agendas,
                            });
                          }
                        }}
                      />
                      <span className="label-text">{agenda}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ul>
              {formData.agendas.map((value, index) => {
                return (
                  <li key={index}>
                    <div className="flex flex-row w-full justify-between">
                      <div className="w-[70%] text-start">{`${
                        index + 1
                      }. ${value}`}</div>
                      <div className="w-[30%] justify-end gap-2 flex flex-row">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                            onClick={() => {
                              console.log(`edit ${index}`);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                            onClick={() => {
                              console.log(`delete ${index}`);
                              let newAgendas = formData.agendas.filter(
                                (value, idx) => idx != index
                              );
                              console.log(newAgendas);
                              setFormData({
                                ...formData,
                                agendas: newAgendas,
                              });
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <label className={`form-control w-full`}>
              <div className="label">
                <span className="label-text">Director</span>
              </div>
              <Select
                options={directors_options}
                onChange={({ value }) => {
                  setFormData({
                    ...formData,
                    director: {
                      name: formatText(value.name),
                      position: formatText(value.position),
                    },
                  });
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Confirmation Date and Time</span>
              </div>
              <input
                type="datetime-local"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(ev) => {
                  const dateTime = new Date(ev.target.value);

                  setFormData({
                    ...formData,
                    confirmation_meeting_date: dateTime,
                    confirmation_meeting_time: formatTime(
                      dateTime.toLocaleTimeString()
                    ),
                  });
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Notice Date and Time</span>
              </div>
              <input
                type="datetime-local"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(ev) => {
                  const dateTime = new Date(ev.target.value);

                  // Extract date and time components
                  const time = dateTime.toLocaleTimeString(); // Get time in locale-specific format

                  const formattedTime = `${time.split(" ")[0].split(":")[0]}:${
                    time.split(" ")[0].split(":")[1]
                  }${time.split(" ")[1]}`;

                  setFormData({
                    ...formData,
                    notice_meeting_date: dateTime,
                    notice_meeting_time: formattedTime,
                  });
                }}
              />
            </label>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-success rounded-lg max-w-20 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-5">
        <PDFViewer className="w-full h-screen">
          <Document>
            <Page size={"A4"} style={styles.view}>
              <View style={{ padding: "0px 50px" }}>
                {company.letterHeader != "" && company.letterHeader != null && (
                  <View>
                    <Image
                      src={company.letterHeader}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignSelf: "center",
                      }}
                    ></Image>
                  </View>
                )}

                <View>
                  <Text style={styles.title}>
                    NOTICE OF 2023 SPECIAL STOCKHOLDERS' MEETING OF
                    {" " + formData.companyName}
                  </Text>
                  <Text
                    style={{
                      marginBottom: "15px",
                      fontFamily: "ProximaNovaBlack",
                    }}
                  >
                    To All Stockholders:
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "20px",
                      textAlign: "justify",
                    }}
                  >
                    <Text style={{ fontFamily: "ProximaNova" }}>
                      Please note that the Annual Stockholders' Meeting of
                    </Text>
                    <Text
                      style={{
                        fontFamily: "ProximaNovaBlack",
                        marginTop: "1.8px",
                      }}
                    >
                      {" " + formData.companyName + " "}
                    </Text>
                    <Text style={{ fontFamily: "ProximaNova" }}>
                      (the "Corporation") will be held on
                    </Text>
                    <Text>
                      {" " +
                        moment(formData.actual_meeting_date).format(
                          "dddd, DD MMMM YYYY"
                        )}
                    </Text>
                    <Text>, at </Text>
                    <Text style={{ fontFamily: "ProximaNova" }}>
                      {` ${formData.actual_meeting_time},`}
                    </Text>
                    <Text>
                      {formData.place_of_meeting == "Video Conference" ||
                      formData.place_of_meeting == "Teleconference"
                        ? `via ${formData.place_of_meeting}`
                        : formData.place_of_meeting + "."}
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginBottom: "20px",
                      textDecoration: "underline",
                    }}
                  >
                    The Agenda:
                  </Text>
                  <View style={{ flexDirection: "column", width: 400 }}>
                    {formData.agendas.map((value, index) => {
                      return (
                        <View
                          key={index}
                          style={{ flexDirection: "row", marginBottom: 4 }}
                        >
                          <Text style={{ textAnchor: "10px" }}>
                            {index + 1 + ". "}
                          </Text>
                          <Text>{value}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <Text> </Text>
                  <Text>
                    Stockholders intending to attend and vote in the meeting
                    should notify the Corporate Secretary by email on or before
                    {` ${moment(formData.confirmation_meeting_date).format(
                      "DD MMMM YYYY,"
                    )} ${
                      formData.confirmation_meeting_time
                    } (Philippine Time).`}
                  </Text>
                  <Text> </Text>
                  <Text style={{ marginBottom: "15px" }}>
                    Stockholders who cannot attend the meeting but would like to
                    be represented thereat should accomplish the attached proxy
                    form which has been emailed to them together with this
                    Notice, and return the same via email on or before
                    {` ${moment(formData.confirmation_meeting_date).format(
                      "DD MMMM YYYY,"
                    )} ${
                      formData.confirmation_meeting_time
                    } (Philippine Time).`}
                  </Text>

                  <Text style={{ margin: "30px 0px" }}>
                    FOR THE BOARD OF DIRECTORS:
                  </Text>

                  <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                    {formData.director.name}
                  </Text>
                  <Text>{formData.director.position}</Text>
                  <Text>{formData.email}</Text>
                </View>
              </View>
            </Page>
            <Page size={"A4"} style={styles.view}>
              <View style={{ padding: "0px 50px" }}>
                {company.letterHeader != "" && company.letterHeader != null && (
                  <View>
                    <Image
                      src={company.letterHeader}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignSelf: "center",
                      }}
                    ></Image>
                  </View>
                )}
                <View>
                  <Text style={styles.title}>Proxy</Text>
                  <Text
                    style={{
                      marginBottom: "15px",
                      fontFamily: "ProximaNovaBlack",
                    }}
                  >
                    KNOW ALL MEN BY THESE PRESENTS:
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "20px",
                      textAlign: "justify",
                    }}
                  >
                    <Text>I/We the undersigned Stockholder(s) of</Text>
                    <Text
                      style={{
                        fontFamily: "ProximaNovaBlack",
                        marginTop: "1.8px",
                      }}
                    >
                      {" " + formData.companyName + " "}
                    </Text>
                    <Text>(the “Corporation”), </Text>
                    <Text>do hereby name and appoint:</Text>
                  </View>
                  <View style={{ marginBottom: "30px" }}>
                    <Svg
                      height="10"
                      width="100%"
                      style={{ marginBottom: "10px" }}
                    >
                      <Line
                        x1="0"
                        y1="10"
                        x2="500"
                        y2="10"
                        strokeWidth={1}
                        stroke="rgb(0,0,0)"
                      />
                    </Svg>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        marginBottom: "20px",
                        textAlign: "justify",
                      }}
                    >
                      <Text>
                        or in his/her absence, the Chairman of the Meeting, as
                        my/our proxy to represent the undersigned and vote all
                        shares owned by and/ or registered in the name of the
                        undersigned in the books of the Corporation at the
                        Annual Stockholders' Meeting of the Corporation to be
                        held on
                      </Text>
                      <Text>{`${moment(formData.actual_meeting_date).format(
                        "dddd, DD MMMM YYYY"
                      )} at `}</Text>
                      <Text>{`${formData.actual_meeting_time} `}</Text>
                      <Text>{`${formData.place_of_meeting} `}</Text>
                      <Text>and at any postponement or </Text>
                      <Text>adjournment thereof.</Text>
                    </View>
                  </View>
                  <View>
                    <Svg height="10" width="100%">
                      <Line
                        x1="0"
                        y1="10"
                        x2="230"
                        y2="10"
                        strokeWidth={1}
                        stroke="rgb(0,0,0)"
                      />
                    </Svg>
                  </View>
                  <Text style={{ marginTop: "5px", marginBottom: "5px" }}>
                    Signature over Printed Name
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text>Number of shares held:</Text>
                    <View
                      style={{
                        width: "100%",
                        marginLeft: "33px",
                        marginTop: "3px",
                      }}
                    >
                      <Svg height="10" width="100%">
                        <Line
                          x1="0"
                          y1="10"
                          x2="105"
                          y2="10"
                          strokeWidth={1}
                          stroke="rgb(0,0,0)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </>
  );
};

export default GenNomPage;
