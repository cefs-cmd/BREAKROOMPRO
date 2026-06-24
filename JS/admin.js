       //    KAUN ALEXSSANDRE
       // Dados do estoque - ARMAZENAMENTO ÚNICO
        let inventario = [
            {id: 1, nome:"Monitor CRT Antigo", peso: 6.0, qtd:12, preço: 10.0, cat:"Eletrônicos", status:"Disponível", img:"https://images.unsplash.com/photo-1547082299-de196ea013d6?w=150"},
            {id: 2, nome:"Garrafas de Vidro", peso: 0.6, qtd:45, preço: 3.0, cat:"Vidros", status:"Disponível", img:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150"},
            {id: 3, nome:"Cadeira de Madeira Velha", peso:12.0, qtd:7, preço: 13.0,  cat:"Móveis", status:"Disponível", img:"https://images.unsplash.com/photo-1503602642458-232111445657?w=150"},
            {id: 4, nome:"Televisor de Tubo", peso:22.5, qtd:3, preço: 18.0, cat: "Eletrônicos", status:"Últimas", img:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=150"}
        ];

        let itensSelecionados = [];
        let horarioSelecionado = null;
        let valorTotal = 0;
        let usuarioLogado = false;

        // Configurações de acesso
        const ADMIN_USER = "admin";
        const ADMIN_PASS = "admin123";

        document.addEventListener("DOMContentLoaded", () => {
            carregarInventario();
            carregarTabelaAdmin();
        });

        // ========== FUNÇÕES DO CLIENTE / AGENDAMENTO ==========
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
                const statusClass = item.status === 'Disponível' ? 'status-disponivel' : item.status === 'Últimas' ? 'status-ultimas' : 'status-indisponivel';
                containerTabela.innerHTML += `
                <tr id="tr-${item.id}" onclick="toggleRowSelect(${item.id}, event)">
                    <td class="circle-select-cell">
                        <input type="checkbox" id="chk-${item.id}" class="circle-checkbox" onchange="updateRowStyle(this, ${item.id})" ${item.status === 'Indisponível' ? 'disabled' : ''}>
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
                    <td style="text-align:center;"><span class="status-badge ${statusClass}">${item.status}</span></td>
                </tr>`;
            });
        }

        function toggleRowSelect(rowId, event) {
            if (event.target.tagName === 'INPUT') return;
            const checkbox = document.getElementById(`chk-${rowId}`);
            if (checkbox && !checkbox.disabled) { 
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
                document.getElementById('contentBoleto').class.remove('hidden');
            } else if (method === 'pix') {
                document.getElementById('tabPix').classList.add('active');
                document.getElementById('contentPix').classList.remove('hidden');
            }
        }

        function copiarCodigoPix() {
            navigator.clipboard.writeText(document.getElementById('codigoPix').textContent.trim());
            alert('Código PIX copiado!');
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

        // ========== FUNÇÕES ADMINISTRATIVAS ==========
        function abrirLoginAdmin() {
            document.getElementById('loginAdmin').classList.remove('hidden');
        }

        function fecharLoginAdmin() {
            document.getElementById('loginAdmin').classList.add('hidden');
            document.getElementById('adminUser').value = '';
            document.getElementById('adminPass').value = '';
        }

        function validarLoginAdmin() {
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;

            if(user === ADMIN_USER && pass === ADMIN_PASS) {
                usuarioLogado = true;
                fecharLoginAdmin();
                document.getElementById('adminPanel').classList.remove('hidden');
            } else {
                alert('Usuário ou senha incorretos!');
            }
        }

        function fecharPainelAdmin() {
            document.getElementById('adminPanel').classList.add('hidden');
            usuarioLogado = false;
        }
    // junção da tabela da agenda
        function carregarTabelaAdmin() {
            const container = document.getElementById('tabelaAdmin');
            container.innerHTML = '';

            inventario.forEach(item => {
                const statusClass = item.status === 'Disponível' ? 'status-disponivel' : item.status === 'Últimas' ? 'status-ultimas' : 'status-indisponivel';
                container.innerHTML += `
                <tr id="admin-tr-${item.id}">
                    <td>${item.id}</td>
                    <td><input type="text" class="edit-input" value="${item.nome}" onchange="atualizarItem(${item.id}, 'nome', this.value)"></td>
                    <td><input type="number" step="0.1" class="edit-input" value="${item.peso}" onchange="atualizarItem(${item.id}, 'peso', parseFloat(this.value))"></td>
                    <td><input type="number" class="edit-input" value="${item.qtd}" onchange="atualizarItem(${item.id}, 'qtd', parseInt(this.value))"></td>
                    <td><input type="number" step="0.01" class="edit-input" value="${item.preço}" onchange="atualizarItem(${item.id}, 'preço', parseFloat(this.value))"></td>
                    <td><input type="text" class="edit-input" value="${item.cat}" onchange="atualizarItem(${item.id}, 'cat', this.value)"></td>
                    <td>
                        <select class="edit-input" onchange="atualizarItem(${item.id}, 'status', this.value)">
                            <option value="Disponível" ${item.status==='Disponível'?'selected':''}>Disponível</option>
                            <option value="Últimas" ${item.status==='Últimas'?'selected':''}>Últimas</option>
                            <option value="Indisponível" ${item.status==='Indisponível'?'selected':''}>Indisponível</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn-action btn-sm btn-danger" onclick="removerItem(${item.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            });
        }

        function atualizarItem(id, campo, valor) {
            const index = inventario.findIndex(i => i.id === id);
            if(index !== -1) {
                inventario[index][campo] = valor;
                // ATUALIZA AUTOMATICAMENTE A TABELA DE AGENDAMENTO
                carregarInventario();
            }
        }

        function removerItem(id) {
            if(confirm('Tem certeza que deseja remover este item?')) {
                inventario = inventario.filter(i => i.id !== id);
                carregarTabelaAdmin();
                carregarInventario();
            }
        }

        function adicionarNovoItem() {
            const novoId = inventario.length > 0 ? Math.max(...inventario.map(i => i.id)) + 1 : 1;
            const novoItem = {
                id: novoId,
                nome: "Novo Item",
                peso: 1.0,
                qtd: 1,
                preço: 5.0,
                cat: "Geral",
                status: "Disponível",
                img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=150"
            };

            inventario.push(novoItem);
            carregarTabelaAdmin();
            carregarInventario();
        }
   