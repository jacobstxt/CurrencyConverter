const Convert = (path) => {
    axios.get(path)
        .then(resp => {
            const { data, status } = resp;
            console.log("Resp status", status);


            const amount = parseFloat(document.getElementById("amount").value);
            const fromCurrency = document.getElementById("currency").value;
            const toCurrency = document.getElementById("ToCurrency").value;
            const resultField = document.getElementById("Total");

            console.log("Вхідні дані:", { amount, fromCurrency, toCurrency });

            if (isNaN(amount) || amount <= 0) {
                resultField.innerText = "Некоректна сума";
                return;
            }

            let fromRate = 1, toRate = 1;

            
            data.forEach(item => {
                if (item.ccy === fromCurrency) fromRate = parseFloat(item.sale);
                if (item.ccy === toCurrency) toRate = parseFloat(item.buy);
            });

          
            let result;
            if (fromCurrency === "UAH") {
                result = amount / toRate;
            } else if (toCurrency === "UAH") {
                result = amount * fromRate;
            } else {
                result = (amount * fromRate) / toRate;
            }

            console.log("Результат:", result);
            resultField.value = `${result.toFixed(2)}`;
        })
        .catch(error => console.error("Помилка завантаження курсу:", error));
};
