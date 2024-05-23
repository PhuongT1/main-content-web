export const getPageStyle = () => {
    return `
      @media print {
        body {
          margin: 0;
        }

        @page :first {
          margin-bottom: 15.875mm;
          margin-top:0;
        }

         @page {
           margin-top: 15.875mm; /* Giá trị margins của tài liệu in */
         }
      }
    `
  }