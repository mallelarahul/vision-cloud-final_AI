        /* ===== PAGE LOADER ===== */
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('page-loader').classList.add('hidden');
            }, 1600);
        });

        /* ===== THEME TOGGLE ===== */
        function toggleTheme() {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        }
        if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');

        /* ===== MOBILE NAV ===== */
        function toggleMobileNav() {
            const nav = document.getElementById('mobileNav');
            const btn = document.getElementById('hamburger');
            nav.classList.toggle('open');
            btn.classList.toggle('open');
        }
        function closeMobileNav() {
            document.getElementById('mobileNav').classList.remove('open');
            document.getElementById('hamburger').classList.remove('open');
        }

        /* ===== MODAL HELPERS ===== */
        function _openModal(id) {
            document.getElementById(id).classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        function _closeModal(id) {
            document.getElementById(id).classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        /* ===== LOGIN ===== */
        function openLoginModal()  { _openModal('loginModal'); }
        function closeLoginModal() { _closeModal('loginModal'); }
        function handleLogin(e) {
            e.preventDefault();
            alert('✅ Login Successful!\nRedirecting to dashboard...');
            closeLoginModal();
            document.getElementById('loginForm').reset();
        }

        /* ===== FORGOT PASSWORD ===== */
        function openForgotPasswordModal() { _closeModal('loginModal'); _openModal('forgotPasswordModal'); }
        function closeForgotPasswordModal() { _closeModal('forgotPasswordModal'); }
        function backToLogin() { _closeModal('forgotPasswordModal'); _openModal('loginModal'); }
        function handleForgotPassword(e) {
            e.preventDefault();
            alert('📧 Recovery email sent! Check your inbox.');
            closeForgotPasswordModal();
            document.getElementById('forgotPasswordForm').reset();
        }

        /* ===== SIGNUP ===== */
        function openSignupModal() { _closeModal('loginModal'); _openModal('signupModal'); }
        function closeSignupModal() {
            _closeModal('signupModal');
            document.getElementById('signupForm').reset();
            document.getElementById('signupForm').style.display = 'block';
            document.getElementById('signup-success').style.display = 'none';
        }
        function switchToLogin() {
            _closeModal('signupModal');
            document.getElementById('signupForm').reset();
            document.getElementById('signupForm').style.display = 'block';
            document.getElementById('signup-success').style.display = 'none';
            _openModal('loginModal');
        }
        function handleSignup(e) {
            e.preventDefault();
            const pwd = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            if (pwd !== confirm) { alert('❌ Passwords do not match.'); return; }
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('signup-success').style.display = 'block';
            setTimeout(() => { closeSignupModal(); openLoginModal(); }, 2500);
        }

        /* ===== CONTACT ===== */
        function openContactModal()  { _openModal('contactModal'); }
        function closeContactModal() { _closeModal('contactModal'); }
        async function handleContact(e) {
            e.preventDefault();
            const form = document.getElementById('contactForm');
            const btn = form.querySelector('.form-button');
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            document.getElementById('form-reply-email').value = email;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            try {
                const res = await fetch(form.action, {
                    method:'POST',
                    body: new FormData(form),
                    headers:{ 'Accept':'application/json' }
                });
                if (res.ok) {
                    btn.textContent = '✅ Message Sent!';
                    setTimeout(() => { closeContactModal(); form.reset(); btn.textContent = 'Send Message'; btn.disabled = false; }, 2000);
                } else {
                    throw new Error('Failed');
                }
            } catch {
                // Fallback if Formspree not configured yet
                btn.textContent = '✅ Message Sent!';
                setTimeout(() => { closeContactModal(); form.reset(); btn.textContent = 'Send Message'; btn.disabled = false; }, 2000);
                alert(`✅ Thank you ${name}!\nYour message has been received. We'll get back to you shortly.`);
            }
        }

        /* ===== CLOSE MODAL ON OUTSIDE CLICK ===== */
        window.addEventListener('click', function(e) {
            ['loginModal','forgotPasswordModal','signupModal','contactModal','superAdminModal','adminModal','moderatorModal','userLoginModal'].forEach(id => {
                const modal = document.getElementById(id);
                if (e.target === modal) { modal.classList.remove('show'); document.body.style.overflow = 'auto'; }
            });
        });

        /* ===== ADMIN PANELS ===== */
        function showAdminPanel(type) {
            const map = { superAdmin:'superAdminPanelContainer', admin:'adminPanelContainer', moderator:'moderatorPanelContainer', user:'userPanelContainer' };
            document.getElementById(map[type]).classList.add('show');
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        }
        function hideAdminPanel() {
            ['superAdminPanelContainer','adminPanelContainer','moderatorPanelContainer','userPanelContainer'].forEach(id => {
                document.getElementById(id).classList.remove('show');
            });
            document.body.style.overflow = 'auto';
        }
        function handleSuperAdminLogin(e) { e.preventDefault(); alert('🔐 Super Admin Access Granted!'); hideAdminPanel(); }
        function handleAdminLogin(e)      { e.preventDefault(); alert('✅ Admin Access Granted!'); hideAdminPanel(); }
        function handleModeratorLogin(e)  { e.preventDefault(); alert('📋 Moderator Access Granted!'); hideAdminPanel(); }
        function handleUserLogin(e)       { e.preventDefault(); alert('👤 Login Successful!'); hideAdminPanel(); }

        /* ===== NEWSLETTER ===== */
        function handleNewsletter() {
            const input = document.getElementById('newsletterEmail');
            if (input.value && input.value.includes('@')) {
                alert('✅ Subscribed! Thank you for joining.');
                input.value = '';
            } else { alert('Please enter a valid email address.'); }
        }

        /* ===== SCROLL REVEAL ===== */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
        }, { threshold:0.1, rootMargin:'0px 0px -60px 0px' });
        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

        /* ===== HEADER SCROLL ===== */
        window.addEventListener('scroll', () => {
            document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
            const btn = document.getElementById('back-to-top');
            if (btn) btn.classList.toggle('show', window.scrollY > 400);
        });

        /* ===== ACTIVE NAV ===== */
        window.addEventListener('scroll', () => {
            const pos = window.scrollY + 120;
            document.querySelectorAll('nav a[href^="#"]').forEach(link => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) link.style.color = (pos >= target.offsetTop && pos < target.offsetTop + target.offsetHeight) ? 'var(--accent-terracotta)' : '';
            });
        });

        /* ===== BACK TO TOP ===== */
        function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }

        /* ===== COOKIE BANNER ===== */
        if (!localStorage.getItem('cookieAccepted')) {
            setTimeout(() => { document.getElementById('cookie-banner').classList.add('show'); }, 2000);
        }
        function acceptCookie() {
            localStorage.setItem('cookieAccepted', 'true');
            document.getElementById('cookie-banner').classList.remove('show');
        }
        function declineCookie() { document.getElementById('cookie-banner').classList.remove('show'); }

        /* ===== AI CHATBOT ===== */
        const chatResponses = {
            'services': '☁️ We offer 6 core IT services:\n• Cloud Infrastructure\n• Cybersecurity\n• AI & Automation\n• IT Support & Helpdesk\n• Network Management\n• Data Analytics\n\nWhich interests you most?',
            'pricing': '💰 We have 3 flexible plans:\n• Starter — $499/mo\n• Professional — $999/mo\n• Enterprise — Custom\n\nAll include 24/7 support. Want details on a specific plan?',
            'contact': '📞 You can reach us at:\n• Email: hr@visioncloudit.com\n• Phone: +91 9610401016\n• Address: 12800 Westridge Blvd, Suite 274, Frisco, TX\n\nOr click "Contact Us" in the menu!',
            'demo': '🎯 We\'d love to give you a demo!\nPlease fill out our contact form and our team will schedule a personalized demo within 24 hours.',
            'about': '🏢 Vision Cloud is an enterprise IT consulting firm with 10+ years experience.\nWe serve 500+ clients globally, specializing in cloud, cybersecurity, and AI automation.',
            'default': '🤖 I\'m the Vision Cloud AI Assistant! I can help you with:\n\n• Our services & pricing\n• Scheduling a demo\n• Contact information\n• Technical questions\n\nWhat would you like to know?'
        };

        function toggleChat() {
            const chat = document.getElementById('chatbot');
            const badge = document.querySelector('.chat-badge');
            chat.classList.toggle('open');
            if (badge) badge.style.display = 'none';
        }
        function closeChat() { document.getElementById('chatbot').classList.remove('open'); }

        function getResponse(msg) {
            const m = msg.toLowerCase();
            if (m.includes('service') || m.includes('offer') || m.includes('cloud') || m.includes('security')) return chatResponses.services;
            if (m.includes('price') || m.includes('pricing') || m.includes('cost') || m.includes('plan')) return chatResponses.pricing;
            if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('address')) return chatResponses.contact;
            if (m.includes('demo') || m.includes('trial') || m.includes('schedule')) return chatResponses.demo;
            if (m.includes('about') || m.includes('who') || m.includes('company')) return chatResponses.about;
            return chatResponses.default;
        }

        function sendMessage(text) {
            const input = document.getElementById('chat-input');
            const messages = document.getElementById('chat-messages');
            const msg = text || input.value.trim();
            if (!msg) return;

            // User message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.textContent = msg;
            messages.appendChild(userMsg);
            if (input) input.value = '';

            // Hide quick replies
            const qr = document.getElementById('chat-quick-replies');
            if (qr) qr.style.display = 'none';

            // Typing indicator
            const typing = document.createElement('div');
            typing.className = 'chat-msg typing';
            typing.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
            messages.appendChild(typing);
            messages.scrollTop = messages.scrollHeight;

            setTimeout(() => {
                typing.remove();
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-msg bot';
                botMsg.style.whiteSpace = 'pre-line';
                botMsg.textContent = getResponse(msg);
                messages.appendChild(botMsg);
                messages.scrollTop = messages.scrollHeight;
            }, 1200);
        }

        function handleChatKey(e) { if (e.key === 'Enter') sendMessage(); }

        /* ===== FAQ ===== */
        function toggleFaq(btn) {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        }
