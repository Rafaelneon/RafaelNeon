// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Verifica o tema salvo no localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Server Status API Integration
async function updateServerStatus() {
    const serverStatusEl = document.getElementById('server-status-text');
    const serverPlayersEl = document.getElementById('server-players');
    const serverVersionEl = document.getElementById('server-version');
    
    try {
        serverStatusEl.textContent = 'Verificando...';
        serverStatusEl.classList.add('loading');
        
        const response = await fetch('https://api.mcsrvstat.us/3/survival.rafaelneon.site');
        const data = await response.json();
        
        serverStatusEl.classList.remove('loading');
        
        if (data.online) {
            serverStatusEl.textContent = 'Online';
            serverStatusEl.className = 'status-value online';
            serverPlayersEl.textContent = `${data.players.online}/${data.players.max}`;
            serverVersionEl.textContent = data.version || 'Desconhecida';
        } else {
            serverStatusEl.textContent = 'Offline';
            serverStatusEl.className = 'status-value offline';
            serverPlayersEl.textContent = '--/--';
            serverVersionEl.textContent = '--';
        }
    } catch (error) {
        serverStatusEl.classList.remove('loading');
        serverStatusEl.textContent = 'Erro ao verificar';
        serverStatusEl.className = 'status-value offline';
        serverPlayersEl.textContent = '--/--';
        serverVersionEl.textContent = '--';
    }
}

// Update server status on load and every 30 seconds
document.addEventListener('DOMContentLoaded', updateServerStatus);
setInterval(updateServerStatus, 30000);

// Copy IP Function
function copiarIP(ip) {
    const btn = event.target.closest('.btn');
    const originalHTML = btn.innerHTML;
    
    navigator.clipboard.writeText(ip).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i><span>IP Copiado!</span>';
        btn.style.backgroundColor = 'var(--accent-color)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = '';
        }, 2000);
        
        showNotification('IP copiado para a área de transferência!', 'success');
    }).catch(() => {
        // Fallback para navegadores antigos
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        btn.innerHTML = '<i class="fas fa-check"></i><span>IP Copiado!</span>';
        btn.style.backgroundColor = 'var(--accent-color)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = '';
        }, 2000);
        
        showNotification('IP copiado para a área de transferência!', 'success');
    });
}

// Discord Invite Function
function conviteDiscord() {
    window.open('https://discord.gg/JFcHwFKKSg', '_blank');
    showNotification('Redirecionando para o Discord...', 'info');
}

// Modal Functions
function abrirModal(tipo) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    let content = '';
    
    switch(tipo) {
        case 'minecraft-templates':
            modalTitle.textContent = 'Templates Minecraft';
            content = `
                <div class="templates-grid">
                    <div class="template-item">
                        <i class="fas fa-file-code"></i>
                        <h4>Configurações Básicas</h4>
                        <p>server.properties, ops.json, whitelist.json</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('basico')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-cogs"></i>
                        <h4>Plugins Essenciais</h4>
                        <p>EssentialsX, WorldGuard, LuckPerms</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('plugins')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-shield-alt"></i>
                        <h4>Configurações de Segurança</h4>
                        <p>Firewall, backups automáticos</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('seguranca')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-chart-bar"></i>
                        <h4>Scripts de Monitoramento</h4>
                        <p>Monitoramento de CPU, RAM, jogadores</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('monitoramento')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                </div>
            `;
            break;
            
        case 'bot-templates':
            modalTitle.textContent = 'Templates Bot Discord';
            content = `
                <div class="templates-grid">
                    <div class="template-item">
                        <i class="fab fa-discord"></i>
                        <h4>Comandos Básicos</h4>
                        <p>ping, help, userinfo, serverinfo</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('bot-basico')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-music"></i>
                        <h4>Sistema de Música</h4>
                        <p>play, pause, skip, queue</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('bot-musica')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-gamepad"></i>
                        <h4>Minigames</h4>
                        <p>slot, coinflip, rps, quiz</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('bot-games')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-tools"></i>
                        <h4>Moderação</h4>
                        <p>ban, kick, mute, warn</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('bot-moderacao')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                </div>
            `;
            break;
            
        case 'seguranca-templates':
            modalTitle.textContent = 'Templates Segurança';
            content = `
                <div class="templates-grid">
                    <div class="template-item">
                        <i class="fas fa-link"></i>
                        <h4>Anti-Phishing</h4>
                        <p>Lista de domínios suspeitos, verificação automática</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('anti-phishing')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-file-contract"></i>
                        <h4>Logs de Segurança</h4>
                        <p>Templates para logs detalhados de incidentes</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('logs-seguranca')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-user-shield"></i>
                        <h4>Verificação de Usuários</h4>
                        <p>Sistema de verificação, captcha, 2FA</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('verificacao')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                    <div class="template-item">
                        <i class="fas fa-database"></i>
                        <h4>Backup de Dados</h4>
                        <p>Scripts automáticos de backup e restauração</p>
                        <button class="btn btn-primary" onclick="downloadTemplate('backup')">
                            <i class="fas fa-download"></i> Baixar
                        </button>
                    </div>
                </div>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Info Modal Functions
function mostrarInfo(tipo) {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('info-modal-title');
    const modalBody = document.getElementById('info-modal-body');
    
    let content = '';
    
    switch(tipo) {
        case 'minecraft':
            modalTitle.textContent = 'Informações do Servidor Minecraft';
            content = `
                <div class="info-content">
                    <h4>🎮 Sobre o Servidor</h4>
                    <p>Nosso servidor é focado em sobrevivência pura com elementos de semi-anarquia, proporcionando uma experiência desafiadora e divertida.</p>
                    
                    <h4>📋 Regras Principais</h4>
                    <ul>
                        <li>✅ Sem microtransações</li>
                        <li>✅ Griefing permitido (proteja sua base!)</li>
                        <li>✅ PvP liberado</li>
                        <li>✅ Sem resets frequentes</li>
                        <li>❌ Sem hacks ou cheats</li>
                        <li>❌ Sem discriminação ou toxicidade</li>
                    </ul>
                    
                    <h4>🌟 Recursos Especiais</h4>
                    <ul>
                        <li>Sistema de economia balanceada</li>
                        <li>Eventos semanais</li>
                        <li>Clans e alianças</li>
                        <li>Sistema de quests</li>
                        <li>Recompensas por votação</li>
                    </ul>
                    
                    <h4>🔗 Como Conectar</h4>
                    <p>IP: <code>survival.rafaelneon.site</code></p>
                    <p>Versão: Java Edition 1.20.4</p>
                    <p>Tipo: Survival Semi-Anarquia</p>
                </div>
            `;
            break;
            
        case 'bot-comunidade':
            modalTitle.textContent = 'Comandos do Bot de Comunidade';
            content = `
                <div class="info-content">
                    <h4>🤖 Comandos Principais</h4>
                    <div class="command-list">
                        <div class="command-item">
                            <code>!ping</code>
                            <span>Verifica a latência do bot</span>
                        </div>
                        <div class="command-item">
                            <code>!userinfo [@usuário]</code>
                            <span>Mostra informações do usuário</span>
                        </div>
                        <div class="command-item">
                            <code>!serverinfo</code>
                            <span>Mostra informações do servidor</span>
                        </div>
                        <div class="command-item">
                            <code>!avatar [@usuário]</code>
                            <span>Mostra o avatar do usuário</span>
                        </div>
                        <div class="command-item">
                            <code>!weather [cidade]</code>
                            <span>Mostra a previsão do tempo</span>
                        </div>
                    </div>
                    
                    <h4>🎵 Comandos de Música</h4>
                    <div class="command-list">
                        <div class="command-item">
                            <code>!play [música]</code>
                            <span>Toca uma música</span>
                        </div>
                        <div class="command-item">
                            <code>!pause</code>
                            <span>Pausa a música atual</span>
                        </div>
                        <div class="command-item">
                            <code>!skip</code>
                            <span>Pula para a próxima música</span>
                        </div>
                        <div class="command-item">
                            <code>!queue</code>
                            <span>Mostra a fila de músicas</span>
                        </div>
                    </div>
                    
                    <h4>🎮 Comandos de Diversão</h4>
                    <div class="command-list">
                        <div class="command-item">
                            <code>!coinflip</code>
                            <span>Cara ou coroa</span>
                        </div>
                        <div class="command-item">
                            <code>!rps [pedra/tesoura/papel]</code>
                            <span>Jokenpô</span>
                        </div>
                        <div class="command-item">
                            <code>!slot</code>
                            <span>Máquina de slot</span>
                        </div>
                        <div class="command-item">
                            <code>!8ball [pergunta]</code>
                            <span>Magic 8 Ball</span>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'bot-seguranca':
            modalTitle.textContent = 'Recursos do Bot de Segurança';
            content = `
                <div class="info-content">
                    <h4>🛡️ Proteções Ativas</h4>
                    <ul>
                        <li>🔍 <strong>Anti-Phishing:</strong> Verifica todos os links enviados</li>
                        <li>🚫 <strong>Anti-Spam:</strong> Previne flood e mensagens repetidas</li>
                        <li>👥 <strong>Anti-Raid:</strong> Proteção contra raids massivas</li>
                        <li>🔗 <strong>Link Filtering:</strong> Bloqueia links suspeitos automaticamente</li>
                        <li>📁 <strong>File Scanning:</strong> Verifica arquivos anexados (em breve)</li>
                    </ul>
                    
                    <h4>📊 Sistema de Logs</h4>
                    <p>Todas as ações de segurança são registradas em canais específicos para moderação.</p>
                    
                    <h4>⚙️ Configurações</h4>
                    <p>O bot pode ser configurado por administradores com comandos específicos para ajustar o nível de proteção.</p>
                    
                    <h4>🚨 Resposta Automática</h4>
                    <p>Quando uma ameaça é detectada, o bot responde instantaneamente removendo o conteúdo e notificando a equipe.</p>
                </div>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function fecharInfoModal() {
    const modal = document.getElementById('info-modal');
    modal.classList.remove('active');
}

// Download Template Function
function downloadTemplate(templateType) {
    showNotification(`Preparando download do template: ${templateType}...`, 'info');
    
    // Simula download
    setTimeout(() => {
        showNotification(`Template ${templateType} baixado com sucesso!`, 'success');
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = 'rgba(16, 185, 129, 0.9)';
            break;
        case 'error':
            notification.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
            break;
        default:
            notification.style.backgroundColor = 'rgba(107, 70, 193, 0.9)';
    }
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Form Submission
const contactForm = document.querySelector('.contato-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Mostrar loading no botão
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Enviando...</span>';
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            showNotification(`Obrigado ${name}! Sua mensagem foi enviada.`, 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.projeto-card, .sobre-content, .contato-content, .changelog-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Adicionar efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Adicionar loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// CSS para loading (adicionar ao styles.css)
const loadingCSS = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .command-list {
        margin: 1rem 0;
    }
    
    .command-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background-color: var(--bg-secondary);
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .command-item code {
        background-color: var(--primary-color);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-family: 'Courier New', monospace;
    }
    
    .info-content h4 {
        color: var(--primary-color);
        margin: 1.5rem 0 0.5rem 0;
    }
    
    .info-content ul {
        list-style: none;
        padding: 0;
    }
    
    .info-content li {
        padding: 0.5rem 0;
        color: var(--text-secondary);
    }
    
    .notification {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
`;

// Adicionar o CSS de loading dinamicamente
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);

// Fechar modais ao clicar fora
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    const infoModal = document.getElementById('info-modal');
    
    if (e.target === modal) {
        fecharModal();
    }
    
    if (e.target === infoModal) {
        fecharInfoModal();
    }
});

// Adicionar estilos adicionais para os comandos
const commandStyles = `
    .command-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background-color: var(--bg-secondary);
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        transition: transform 0.2s ease;
    }
    
    .command-item:hover {
        transform: translateX(5px);
    }
    
    .command-item code {
        background-color: var(--primary-color);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
    }
    
    .command-item span {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
`;

const commandStyle = document.createElement('style');
commandStyle.textContent = commandStyles;
document.head.appendChild(commandStyle);
