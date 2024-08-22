import {
  Document,
  Font,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import React, { useState } from "react";
import CambriaFont from "/Cambria.ttf";
import ProximaNovaFont from "/ProximaNova.ttf";
import ProximaNovaBlackFont from "/ProximaNovaBlack.ttf";



const ReactPDFPage = () => {
  // Register font
  Font.register({ family: "Roboto", src: CambriaFont });
  Font.register({ family: "ProximaNova", src: ProximaNovaFont });
  Font.register({ family: "ProximaNovaBlackFont", src: ProximaNovaBlackFont });


  // Reference font
  const styles = StyleSheet.create({
    title: {
      fontFamily: "Times-Bold",
    },
    proximanova: {
      fontFamily: "Times-Bold",
      // fontStyle: "bolder"
      fontStyle: "heavy"

    },
    roboto: {
      fontFamily: "Roboto",
    },
  });

  return (
    <>
      <div>
        <PDFViewer className="w-full">
          <Document>
            <Page>
              <Text style={styles.roboto}>Cambria123</Text>
              <Text style={styles.proximanova}>Proxima Nova</Text>

            </Page>
          </Document>
        </PDFViewer>
      </div>
    </>
  );
};

export default ReactPDFPage;
