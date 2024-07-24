document.getElementById("downloadPDF").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;

    const datosScript = document.getElementById('datosScript');
    const datos = JSON.parse(datosScript.textContent);
    const datosTransformados = datos.map(item => [
        item.destilado,
        item.piezas,
        item.militros,
        '$ ' + item.precio
    ]);

    // Crear canvas para la imagen de fondo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const logo = new Image();

    img.src = '/web/imagenes/fondo.png';
    logo.src = '/web/imagenes/logoX2.png';

    // Esperar a que ambas imágenes se carguen
    const loadImages = () => {
        return new Promise((resolve) => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.globalAlpha = 0.7; // Ajustar opacidad de la imagen de fondo
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL('image/png');

                // Cargar el logo después de la imagen de fondo
                logo.onload = () => {
                    const logoData = getImageData(logo);
                    resolve({ imgData, logoData });
                };
            };
        });
    };

    // Función para obtener datos de imagen en base64
    function getImageData(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/jpeg'); // Asume que el logo es JPEG
    }

    // Manejo de la descarga del PDF
    loadImages().then(({ imgData, logoData }) => {
        const doc = new jsPDF();
        
        // Agregar imagen de fondo
        doc.addImage(imgData, 'PNG', 0, 0, 210, 297); // Tamaño A4: 210mm x 297mm

        doc.setTextColor(255, 255, 255); 
        doc.setFont('helvetica', 'bold');

        // Agregar logo al PDF
        doc.addImage(logoData, 'JPEG', 90, 10, 30, 20);

        // Agregar título
        doc.setFontSize(24);
        doc.text('VENTA POR CAJA', 105, 48, { align: 'center' }); // Centrado horizontalmente, ajustado verticalmente

        // Agregar tabla sobre la imagen
        const columns = ["Producto", "Piezas", "Militros", "Precio"];
        doc.autoTable({
            startY: 58,
            head: [columns],
            body: datosTransformados,
            headStyles: {
                fillColor: [36, 64, 25], // Color de fondo para los encabezados
                textColor: [255, 255, 255], // Color del texto en los encabezados
                fontSize: 12,
                fontStyle: 'bold'
            },
            styles: {
                fontSize: 10,
                cellWidth: 'auto',
                halign: 'center',
            },
        });

        const finalY = doc.lastAutoTable.finalY || 80;

        doc.setFontSize(10);
        doc.text('Los precios estan sujetos a cambio sin previo aviso', doc.internal.pageSize.width - 10, finalY + 10, { align: 'right' });
        doc.text('CONTACTANOS', doc.internal.pageSize.width - 10, finalY + 15, { align: 'right' });
        doc.text('Teléfono: 446 128 32 77', doc.internal.pageSize.width - 10, finalY + 20, { align: 'right' });
        doc.text('Instagram: losdestiladosqro', doc.internal.pageSize.width - 10, finalY + 25, { align: 'right' });


        // Descargar el PDF
        doc.save('Precios por Caja Los Destilados.pdf');
    });
});
