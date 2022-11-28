// Copy paste from pdfmake playground
// To be edited later

const logo = "";
const poster = "";

const TICKET_WIDTH = 400;
const MY_LAYOUT = {
  hLineWidth: function (i, node) {
    if (i == 3 || i == 4 || i == 6 || i == 8) {
      return 1;
    }
    return 0;
  },
  vLineWidth: function (i, node) {
    return 1;
  },
  hLineColor: function (i, node) {
    return "#cccccc";
  },
  vLineColor: function (i, node) {
    return "#808080";
  },
  paddingLeft: function (i, node) {
    return 0;
  },
  paddingRight: function (i, node) {
    return 0;
  },
  paddingTop: function (i, node) {
    return 0;
  },
  paddingBottom: function (i, node) {
    return 0;
  },
};

const dd = {
  pageSize: {
    width: TICKET_WIDTH,
    height: "auto",
  },
  pageMargins: [0, 0, 0, 0],
  content: [
    {
      layout: MY_LAYOUT,
      width: "auto",
      table: {
        alignment: "center",
        widths: [TICKET_WIDTH],
        body: [
          [
            {
              image: logo,
              width: 300,
              fillColor: "#000000",
              alignment: "left",
              margin: [20, 20],
            },
          ],
          [
            {
              image: poster,
              width: TICKET_WIDTH,
            },
          ],
          [
            {
              text: "CodeMania",
              width: TICKET_WIDTH,
              height: (TICKET_WIDTH / 16) * 9, // 16:9 ratio
              fillColor: "#ffffff",
              alignment: "left",
              margin: [20, 20],
              fontSize: 25,
              bold: true,
            },
          ],
          [
            {
              layout: "noBorders",
              table: {
                widths: [250, 250],
                alignment: "center",
                body: [
                  [
                    {
                      text: "Date",
                      fillColor: "#ffffff",
                      alignment: "left",
                      margin: [20, 20, 0, 0],
                      fontSize: 15,
                    },
                    {
                      text: "Time",
                      fillColor: "#ffffff",
                      alignment: "left",
                      margin: [0, 20, 20, 0],
                      fontSize: 15,
                    },
                  ],
                  [
                    {
                      text: "Sun, 11th Dec, 2022",
                      fillColor: "#ffffff",
                      alignment: "left",
                      margin: [20, 0, 0, 20],
                      fontSize: 20,
                      bold: true,
                    },
                    {
                      text: "11:00 AM",
                      fillColor: "#ffffff",
                      alignment: "left",
                      margin: [0, 0, 20, 20],
                      fontSize: 20,
                      bold: true,
                    },
                  ],
                ],
              },
            },
          ],
          [
            {
              text: "Venue",
              width: TICKET_WIDTH,
              fillColor: "#ffffff",
              alignment: "left",
              margin: [20, 20, 20, 0],
              fontSize: 15,
            },
          ],
          [
            {
              text: "Auditorium, AB-2",
              width: TICKET_WIDTH,
              fillColor: "#ffffff",
              alignment: "left",
              margin: [20, 0, 20, 20],
              fontSize: 20,
              bold: true,
            },
          ],
          [
            {
              qr: "text in QR",
              width: TICKET_WIDTH,
              alignment: "center",
              margin: [0, 30, 0, 0],
            },
          ],
          [
            {
              text: "Scan code for checking-in",
              width: TICKET_WIDTH,
              alignment: "center",
              margin: [0, 10, 0, 30],
            },
          ],
        ],
      },
    },
  ],
};
