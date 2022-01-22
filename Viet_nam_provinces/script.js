    const provinceSelector = document.getElementById("province");
            provinceSelector.innerHTML = `<option value="">-- Tỉnh & Thành Phố -- </option>`;

            const districtSelector = document.getElementById("district");
            districtSelector.innerHTML = `<option value="">-- Quận & Huyện -- </option>`;

            const communeSelector = document.getElementById("commune");
            communeSelector.innerHTML = `<option value="">-- Phường & Xã-- </option>`;

            async function getProvince() {
                provinceSelector.innerHTML = `<option value="">-- Tỉnh & Thành Phố -- </option>`;
                try {
                    const response = await fetch("DataProvinceVN.json");
                    const data = await response.json();
                    data.province.forEach((datum) => {
                        const option = document.createElement("option");
                        option.setAttribute("value", datum.name);
                        option.setAttribute("idProvince", datum.idProvince);
                        option.innerText = datum.name;
                        provinceSelector.appendChild(option);
                    });
                } catch (e) {
                    console.log("fail to get province");
                }
            }

            async function getDistrict() {
                if (provinceSelector.value) {
                    districtSelector.innerHTML = `<option value="">-- Quận & Huyện -- </option>`;
                    try {
                        const response = await fetch("DataProvinceVN.json");
                        const data = await response.json();
                        data.district
                            .filter(
                                (datum) =>
                                    datum.idProvince ===
                                    provinceSelector[provinceSelector.selectedIndex].getAttribute(
                                        "idProvince"
                                    )
                            )
                            .forEach((datum) => {
                                const option = document.createElement("option");
                                option.setAttribute("value", datum.name);
                                option.setAttribute("idDistrict", datum.idDistrict);
                                option.innerText = datum.name;
                                districtSelector.appendChild(option);
                            });
                    } catch (e) {
                        console.log("fail to get district");
                    }
                } else districtSelector.innerHTML = `<option value="">-- Quận & Huyện -- </option>`;
            }

            async function getCommune() {
                if (districtSelector.value) {
                    try {
                        communeSelector.innerHTML = `<option value="">-- Phường & Xã-- </option>`;
                        const response = await fetch("DataProvinceVN.json");
                        const data = await response.json();

                        data.commune
                            .filter(
                                (datum) =>
                                    datum.idDistrict ===
                                    districtSelector[districtSelector.selectedIndex].getAttribute(
                                        "idDistrict"
                                    )
                            )
                            .forEach((datum) => {
                                const option = document.createElement("option");
                                option.setAttribute("value", datum.name);
                                option.setAttribute("idCommune", datum.idCommune);
                                option.innerText = datum.name;
                                communeSelector.appendChild(option);
                            });
                    } catch (e) {
                        console.log("fail to get commune");
                    }
                } else communeSelector.innerHTML = `<option value="">-- Phường & Xã-- </option>`;
            }

            getProvince();
            provinceSelector.addEventListener("change", () => {
                getDistrict();
                communeSelector.innerHTML = `<option value="">-- Phường & Xã-- </option>`;
            });

            districtSelector.addEventListener("change", () => {
                getCommune();
            });