function createPropertyDiv(row) {
    const newRow = document.createElement("a");
    newRow.href = row.url;
    newRow.classList.add("deal");

    const link = document.createElement("a");
    link.classList.add("deal-summary");
    let title = row.type + " in " + row.postcode;
    link.appendChild(document.createTextNode(title));
    link.href = row.url;
    newRow.appendChild(link);

    const image = document.createElement("img");
    image.src = "img/" + row.image;
    image.classList.add("property-image");
    newRow.appendChild(image);

    const price = document.createElement("div");
    price.classList.add("price");
    let price_detail = row.price_qualifiers + " £" + row.price + ", estimated rent £" + row.rent_estimate
        + " per month, " + (row.yield_estimate*100).toFixed(1) + "% yield";
    price.appendChild(document.createTextNode(price_detail));
    newRow.appendChild(price);

    return newRow;
}

window.onload = function () {

    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.onreadystatechange = function () {
        console.log("Request  complete");
        if (request.readyState === XMLHttpRequest.DONE) {
            const data = request.response;
            console.log("Got data", data);

            const propertiesDiv = document.getElementById('properties');

            for (const row of data) {
                // propertiesDiv.innerText += row.type;
                const newRow = createPropertyDiv(row);
                propertiesDiv.appendChild(newRow);
            }
        }
    };

    request.open('GET', 'deals.json');
    request.send();
};
