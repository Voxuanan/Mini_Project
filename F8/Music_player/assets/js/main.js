const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'AN_PLAYER';

const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const playlist = $('.playlist');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Buông',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/Buong-BuiAnhTuan-4042300.mp3',
            image: './assets/img/buong.jpg',
        },
        {
            name: 'Hẹn một mai',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/HenMotMai-BuiAnhTuan-4652623.mp3',
            image: './assets/img/henmotmai.jpg',
        },
        {
            name: 'Lặng yên',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/LangYenLangYenDuoiVucSauOST-BuiAnhTuanAiPhuong-4859488.mp3',
            image: './assets/img/langyen.jpg',
        },
        {
            name: 'Mơ hồ',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/MoHo-BuiAnhTuan-3264100.mp3',
            image: './assets/img/moho.jpg',
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function(){
        const htmls = this.songs.map((song, index) =>{
            return `
            <div class="song ${index === this.currentIndex? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function(){
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        const _this = this;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - Math.round(scrollTop);
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        const cdThumbAnimate = cdThumb.animate([
            {   transform: 'rotate(360deg)'}
            ] ,
            {
                duration: 10000,
                iterations: Infinity
            }
        );
        cdThumbAnimate.pause();
        

  
        playBtn.onclick = function(){
            if (app.isPlaying) audio.pause();
                else audio.play();
        }

        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        audio.ontimeupdate = function(){
            if (audio.duration){
                const progressPercent = Math.floor((audio.currentTime / audio.duration) *100)
                progress.value = progressPercent;
            }
        }

        audio.onended = function(){
            if (_this.isRepeat) audio.play();
                else if (_this.isRandom) _this.playRandomSong();
                    else _this.nextSong();
            audio.play();
        }

        progress.onchange = function(e){
            const seekTime = (e.target.value/100)* audio.duration;
            audio.currentTime = seekTime; 
        }

        nextBtn.onclick = function(){
            if (_this.isRandom) _this.playRandomSong();
                else _this.nextSong();
            audio.play();
            _this.render(); 
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function(){
            if (_this.isRandom) _this.playRandomSong();
                else _this.previousSong();
            audio.play();
            _this.render(); 
            _this.scrollToActiveSong();
        }
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)');

            if (  songNode || e.target.closest('.option') ){
                if (songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong(); 
                    audio.play();
                    _this.render();
                }
                
                if (e.target.closest('.option') ){

                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function(){
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
        this.loadCurrentSong();
    },
    previousSong: function(){
        this.currentIndex--;
        if (this.currentIndex < 0 ) this.currentIndex = this.songs.length-1;
        this.loadCurrentSong();
    },
    playRandomSong: function(){
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.currentIndex === newIndex);
        
        this.currentIndex = newIndex;
        this.loadCurrentSong();        
    },
    scrollToActiveSong: function(){
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        },300);
    },
    start: function(){
        this.loadConfig();
        
        this.defineProperties();

        this.handleEvent();

        this.loadCurrentSong();

        this.render();    

        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
};

app.start();