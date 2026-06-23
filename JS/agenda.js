// KAUN ALEXSSANDRE
const inventario = [
            {id: 1, nome:"Monitor CRT Antigo", peso: 6.0, qtd:12, preço: 10.0, cat:"Eletrônicos", status:"Disponível", img:"https://images.unsplash.com/photo-1547082299-de196ea013d6?w=150"},
            {id: 2, nome:"Garrafas de Vidro", peso: 0.6, qtd:45, preço: 3.0, cat:"Vidros", status:"Disponível", img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150"},
            {id: 3, nome:"Cadeira de Madeira Velha", peso:12.0, qtd:7, preço: 13.0,  cat:"Móveis", status:"Disponível", img:"https://images.unsplash.com/photo-1503602642458-232111445657?w=150"},
            {id: 4, nome:"Televisor de Tubo", peso:22.5, qtd:3, preço: 18.0, cat: "Eletrônicos", status:"Últimas", img:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=150"}
        ];

        let itensSelecionados = [];
        let horarioSelecionado = null;
        let valorTotal = 0;

        document.addEventListener("DOMContentLoaded", () => {
            carregarInventario();
        });

        function selectTimeSlot(element) {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
            element.classList.add('selected');
            horarioSelecionado = element.innerText;
        }

        function carregarInventario() {
            const containerTabela = document.getElementById("tabelaInventario");
            if (!containerTabela) return;
            
            containerTabela.innerHTML = "";
            inventario.forEach(item => {
                containerTabela.innerHTML += `
                <tr id="tr-${item.id}" onclick="toggleRowSelect(${item.id}, event)">
                    <td class="circle-select-cell">
                        <input type="checkbox" id="chk-${item.id}" class="circle-checkbox" onchange="updateRowStyle(this, ${item.id})">
                    </td>
                    <td>
                        <div class="item-cell">
                            <img src="${item.img}" class="item-img">
                            <span>${item.nome}</span>
                        </div>
                    </td>
                    <td style="text-align:center;">${item.peso.toFixed(1)}</td>
                    <td style="text-align:center;">${item.qtd}</td>
                    <td style="text-align:center;">R$ ${item.preço.toFixed(2)}</td>
                    <td style="text-align:center;">${item.cat}</td>
                    <td style="text-align:center; color:#28a745; font-weight:bold">${item.status}</td>
                </tr>`;
            });
        }

        function toggleRowSelect(rowId, event) {
            if (event.target.tagName === 'INPUT') return;
            const checkbox = document.getElementById(`chk-${rowId}`);
            if (checkbox) { 
                checkbox.checked = !checkbox.checked; 
                updateRowStyle(checkbox, rowId); 
            }
        }

        function updateRowStyle(checkbox, rowId) {
            const tr = document.getElementById(`tr-${rowId}`);
            if (checkbox.checked) {
                tr.classList.add('selected-row');
                if (!itensSelecionados.includes(rowId)) itensSelecionados.push(rowId);
            } else {
                tr.classList.remove('selected-row');
                itensSelecionados = itensSelecionados.filter(id => id !== rowId);
            }
            
            const selectionActionBar = document.getElementById('selectionActionBar');
            const selectionSummary = document.getElementById('selectionSummary');
            
            if (itensSelecionados.length > 0) {
                selectionActionBar.classList.remove('hidden');
                selectionSummary.innerText = `${itensSelecionados.length} item(ns) selecionado(s)`;
            } else {
                selectionActionBar.classList.add('hidden');
            }
        }

        function openPaymentPage() {
            if (!horarioSelecionado) {
                alert("Por favor, selecione um horário para a sua sessão antes de prosseguir!");
                return;
            }

            valorTotal = 0;
            itensSelecionados.forEach(id => {
                const item = inventario.find(i => i.id === id);
                if (item) valorTotal += item.preço;
            });
            
            document.getElementById('catalogContainer').classList.add('hidden');
            document.getElementById('paymentCard').classList.remove('hidden');
            document.getElementById('paymentTotalText').innerText = `Total da Operação (${horarioSelecionado}h): R$ ${valorTotal.toFixed(2)}`;
            document.getElementById('pixValue').innerText = `R$ ${valorTotal.toFixed(2)}`;
            switchPaymentMethod('card'); 
        }

        function switchPaymentMethod(method) {
            document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.payment-method-content').forEach(c => c.classList.add('hidden'));

            if (method === 'card') {
                document.getElementById('tabCard').classList.add('active');
                document.getElementById('contentCard').classList.remove('hidden');
            } else if (method === 'boleto') {
                document.getElementById('tabBoleto').classList.add('active');
                document.getElementById('contentBoleto').classList.remove('hidden');
            } else if (method === 'pix') {
                document.getElementById('tabPix').classList.add('active');
                document.getElementById('contentPix').classList.remove('hidden');
            }
        }

        function backToCatalog() {
            document.getElementById('paymentCard').classList.add('hidden');
            document.getElementById('catalogContainer').classList.remove('hidden');
        }

        function processPayment() {
            document.getElementById('paymentCard').classList.add('hidden');
            document.getElementById('successCard').classList.remove('hidden');
        }

        function resetWorkflow() {
            itensSelecionados = [];
            horarioSelecionado = null;
            valorTotal = 0;
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
            document.getElementById('selectionActionBar').classList.add('hidden');
            
            document.getElementById('successCard').classList.add('hidden');
            document.getElementById('catalogContainer').classList.remove('hidden');
            carregarInventario();
        }