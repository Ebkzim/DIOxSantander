document.addEventListener('DOMContentLoaded', function() {
    const botaoMenu = document.getElementById('botao-menu');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const barraNavegacao = document.getElementById('barra-navegacao');
    const linksNavegacao = document.querySelectorAll('.link-navegacao');

    if (botaoMenu) {
        botaoMenu.addEventListener('click', function() {
            menuNavegacao.classList.toggle('active');
            botaoMenu.classList.toggle('active');
        });
    }

    linksNavegacao.forEach(link => {
        link.addEventListener('click', function() {
            menuNavegacao.classList.remove('active');
            botaoMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            barraNavegacao.classList.add('scrolled');
        } else {
            barraNavegacao.classList.remove('scrolled');
        }
    });

    linksNavegacao.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = barraNavegacao.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

function inicializarAnimacoesScroll() {
    const elementosAnimar = document.querySelectorAll('.animar-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementosAnimar.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const elementosParaAnimar = [
        '.cartao-beneficio',
        '.cartao-programa',
        '.metodo-contato',
        '.item-recurso'
    ];

    elementosParaAnimar.forEach(selector => {
        const elementos = document.querySelectorAll(selector);
        elementos.forEach(elemento => {
            elemento.classList.add('animar-scroll');
        });
    });

    inicializarAnimacoesScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const formularioContato = document.getElementById('formularioContato');
    
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formularioContato);
            const data = Object.fromEntries(formData);
            
            if (!validarFormulario(data)) {
                return;
            }
            
            const botaoSubmit = formularioContato.querySelector('button[type="submit"]');
            const textoOriginal = botaoSubmit.innerHTML;
            botaoSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botaoSubmit.disabled = true;
            formularioContato.classList.add('carregando');
            
            setTimeout(() => {
                formularioContato.classList.remove('carregando');
                botaoSubmit.innerHTML = textoOriginal;
                botaoSubmit.disabled = false;
                
                mostrarMensagem('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.', 'sucesso');
                
                formularioContato.reset();
            }, 2000);
        });
    }
});

function validarFormulario(data) {
    const erros = [];
    
    if (!data.nome || data.nome.trim().length < 2) {
        erros.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.email || !emailValido(data.email)) {
        erros.push('Email inválido');
    }
    
    if (!data.interesse) {
        erros.push('Selecione seu interesse');
    }
    
    if (erros.length > 0) {
        mostrarMensagem(erros.join(', '), 'erro');
        return false;
    }
    
    return true;
}

function emailValido(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function mostrarMensagem(mensagem, tipo) {
    const mensagemExistente = document.querySelector('.mensagem-sucesso, .mensagem-erro');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }
    
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem-${tipo}`;
    divMensagem.textContent = mensagem;
    
    const formularioContato = document.getElementById('formularioContato');
    formularioContato.appendChild(divMensagem);
    
    setTimeout(() => {
        divMensagem.remove();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const cartoesPrograma = document.querySelectorAll('.cartao-programa');
    
    cartoesPrograma.forEach(cartao => {
        const botao = cartao.querySelector('.botao');
        if (botao) {
            botao.addEventListener('click', function(e) {
                e.preventDefault();
                
                const nomePrograma = cartao.querySelector('h3').textContent;
                
                mostrarModalInteresse(nomePrograma);
            });
        }
    });
});

function mostrarModalInteresse(nomePrograma) {
    const secaoContato = document.getElementById('contato');
    const selectInteresse = document.getElementById('interesse');
    
    if (secaoContato && selectInteresse) {
        const barraNavegacao = document.getElementById('barra-navegacao');
        const alturaNavegacao = barraNavegacao.offsetHeight;
        const posicaoAlvo = secaoContato.offsetTop - alturaNavegacao;
        
        window.scrollTo({
            top: posicaoAlvo,
            behavior: 'smooth'
        });
        
        const mapaProgramas = {
            'Bootcamp Full Stack': 'bootcamp',
            'Data Science & Analytics': 'data-science',
            'DevOps & Cloud': 'devops'
        };
        
        const valorInteresse = mapaProgramas[nomePrograma] || 'geral';
        selectInteresse.value = valorInteresse;
        
        const formularioContato = document.getElementById('formularioContato');
        formularioContato.style.animation = 'pulse 2s ease-in-out';
        
        setTimeout(() => {
            formularioContato.style.animation = '';
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const numerosEstatistica = document.querySelectorAll('.numero-estatistica');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const valorFinal = target.textContent;
                const valorNumerico = parseInt(valorFinal.replace(/[^\d]/g, ''));
                
                if (valorNumerico > 0) {
                    animarContador(target, valorNumerico, valorFinal);
                }
                
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    numerosEstatistica.forEach(numero => {
        observer.observe(numero);
    });
});

function animarContador(elemento, valorAlvo, textoFinal) {
    const duracao = 2000;
    const tempoInicio = performance.now();
    const valorInicio = 0;
    
    function atualizarContador(tempoAtual) {
        const tempoDecorrido = tempoAtual - tempoInicio;
        const progresso = Math.min(tempoDecorrido / duracao, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progresso, 4);
        const valorAtual = Math.floor(valorInicio + (valorAlvo * easeOutQuart));
        
        if (textoFinal.includes('K')) {
            elemento.textContent = Math.floor(valorAtual / 1000) + 'K+';
        } else {
            elemento.textContent = valorAtual + '+';
        }
        
        if (progresso < 1) {
            requestAnimationFrame(atualizarContador);
        } else {
            elemento.textContent = textoFinal;
        }
    }
    
    requestAnimationFrame(atualizarContador);
}

document.addEventListener('DOMContentLoaded', function() {
    const secaoHero = document.querySelector('.secao-hero');
    
    if (secaoHero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = secaoHero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                secaoHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const conteudoHero = document.querySelector('.conteudo-hero');
    if (conteudoHero) {
        conteudoHero.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    const estatisticasHero = document.querySelectorAll('.item-estatistica');
    estatisticasHero.forEach((stat, index) => {
        stat.style.animation = `fadeInUp 0.6s ease ${0.2 * (index + 1)}s forwards`;
        stat.style.opacity = '0';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const secoes = document.querySelectorAll('section');
    
    const observadorSecoes = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    secoes.forEach(secao => {
        if (!secao.classList.contains('secao-hero')) {
            secao.style.opacity = '0';
            secao.style.transform = 'translateY(20px)';
            secao.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observadorSecoes.observe(secao);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const botoesCta = document.querySelectorAll('.secao-cta .botao-primario');
    
    botoesCta.forEach(botao => {
        botao.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out';
        });
        
        botao.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
});

const estilo = document.createElement('style');
estilo.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(estilo);

document.addEventListener('DOMContentLoaded', function() {
    const imagens = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const observadorImagens = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observadorImagens.unobserve(img);
                }
            });
        });
        
        imagens.forEach(img => observadorImagens.observe(img));
    } else {
        imagens.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
});
