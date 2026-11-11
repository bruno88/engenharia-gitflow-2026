  const STORAGE_USERS_KEY = 'app_users_db';
        const STORAGE_SESSION_KEY = 'app_current_user_email';

        /* INICIALIZAÇÃO */
        window.addEventListener('DOMContentLoaded', () => {
            checkSession();
        });

        /* NAVEGAÇÃO ENTRE TELAS */
        function switchSection(sectionId) {
            const container = document.getElementById('app-container');
            const sections = document.querySelectorAll('.card-section');
            
            // Ajustar largura para dashboard
            if (sectionId === 'dashboard-section') {
                container.classList.add('wide');
            } else {
                container.classList.remove('wide');
            }

            // Alternar seções ativas
            sections.forEach(sec => {
                sec.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        }

        /* NOTIFICAÇÕES TOAST */
        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerText = message;

            container.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'fadeOut 0.3s ease-out forwards';
                toast.addEventListener('animationend', () => {
                    toast.remove();
                });
            }, 3000);
        }

        /* MÉTODOS DE BANCO DE DADOS (localStorage) */
        function getUsers() {
            const users = localStorage.getItem(STORAGE_USERS_KEY);
            return users ? JSON.parse(users) : [];
        }

        function saveUsers(users) {
            localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
        }

        function getCurrentUser() {
            const email = localStorage.getItem(STORAGE_SESSION_KEY);
            if (!email) return null;
            const users = getUsers();
            return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
        }

        /* CADASTRO */
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const password = document.getElementById('reg-password').value;

            const users = getUsers();
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                showToast('Este e-mail já está cadastrado!', 'error');
                return;
            }

            // Novo usuário
            const newUser = { name, email, password };
            users.push(newUser);
            saveUsers(users);

            showToast('Cadastro realizado com sucesso! Faça login.');
            document.getElementById('register-form').reset();
            switchSection('login-section');
        });

        /* LOGIN */
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const password = document.getElementById('login-password').value;

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                showToast('E-mail ou senha incorretos!', 'error');
                return;
            }

            // Iniciar sessão
            localStorage.setItem(STORAGE_SESSION_KEY, user.email);
            showToast(`Bem-vindo, ${user.name}!`);
            document.getElementById('login-form').reset();
            loadDashboard(user);
        });

        /* GERENCIAMENTO DO DASHBOARD */
        function loadDashboard(user) {
            document.getElementById('dash-welcome-name').innerText = user.name;
            document.getElementById('dash-display-email').innerText = user.email;
            document.getElementById('dash-avatar').innerText = user.name.charAt(0);
            document.getElementById('dash-name').value = user.name;
            document.getElementById('dash-password').value = '';

            switchSection('dashboard-section');
        }

        /* ATUALIZAR DADOS */
        document.getElementById('update-profile-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const currentUser = getCurrentUser();
            if (!currentUser) {
                showToast('Erro de sessão. Faça login novamente.', 'error');
                logout();
                return;
            }

            const newName = document.getElementById('dash-name').value.trim();
            const newPassword = document.getElementById('dash-password').value;

            const users = getUsers();
            const userIndex = users.findIndex(u => u.email === currentUser.email);

            if (userIndex !== -1) {
                users[userIndex].name = newName;
                if (newPassword.trim() !== '') {
                    users[userIndex].password = newPassword;
                }

                saveUsers(users);
                showToast('Dados atualizados com sucesso!');
                loadDashboard(users[userIndex]);
            }
        });

        /* LOGOUT */
        function logout() {
            localStorage.removeItem(STORAGE_SESSION_KEY);
            showToast('Você saiu da sua conta.');
            switchSection('login-section');
        }

        /* VERIFICAR SESSÃO ATIVA AO RECARREGAR */
        function checkSession() {
            const activeUser = getCurrentUser();
            if (activeUser) {
                loadDashboard(activeUser);
            } else {
                switchSection('login-section');
            }
        }