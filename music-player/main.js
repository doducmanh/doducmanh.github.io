const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Anh Đếch Cần Gì Nhiều Ngoài Em',
            singer: 'Đen, Vũ, Thành Đồng',
            path: './assets/music/Anh Dech Can Gi Nhieu Ngoai Em - Den_ Vu.mp3',
            image: './assets/img/anhdechcanginhieungoaiem.jpg'
        },
        {
            name: 'Bài Này Chill Phết',
            singer: 'Đen,  Min',
            path: './assets/music/Bai Nay Chill Phet - Den_ Min.mp3',
            image: './assets/img/bainaychillphet.jpg'
        },
        {
            name: 'Cô Gái Bàn Bên',
            singer: 'Đen, Lynk Lee',
            path: './assets/music/Co Gai Ban Ben - Den_ Lynk Lee.mp3',
            image: './assets/img/cogaibanben.jpg'
        },
        {
            name: 'Đi Theo Bóng Mặt Trời',
            singer: 'Đen, Giang Nguyễn',
            path: './assets/music/Di Theo Bong Mat Troi - Den_ Giang Nguye.mp3',
            image: './assets/img/ditheobongmattroi.jpg'
        },
        {
            name: 'Đi Về Nhà',
            singer: 'Đen, Justatee',
            path: './assets/music/Di Ve Nha - Den_ JustaTee.mp3',
            image: './assets/img/divenha.jpg'
        },
        {
            name: 'Đố Em Biết Anh Đang Nghĩ Gì',
            singer: 'JustaTee, Đen, Biên',
            path: './assets/music/Do Em Biet Anh Dang Nghi Gi - JustaTee_.mp3',
            image: './assets/img/doembietanhdangnghigi.jpg'
        },
        {
            name: 'Đưa Nhau Đi Trốn',
            singer: 'Đen, Linh Cáo',
            path: './assets/music/Dua Nhau Di Tron - Den_ Cao.mp3',
            image: './assets/img/duanhauditron.jpg'
        },
        {
            name: 'Hai Triệu Năm',
            singer: 'Đen, Biên',
            path: './assets/music/Hai Trieu Nam - Den_ Bien.mp3',
            image: './assets/img/haitrieunam.jpg'
        },
        {
            name: 'Lối Nhỏ',
            singer: 'Đen, Phương Anh Đào',
            path: './assets/music/Loi Nho - Den_ Phuong Anh Dao.mp3',
            image: './assets/img/loinho.jpg'
        },
        {
            name: 'Lộn Xộn II',
            singer: 'Đen',
            path: './assets/music/Lon Xon II - Den.mp3',
            image: './assets/img/lonxon2.jpg'
        },
        {
            name: 'Loving You Sunny',
            singer: 'Kimmese, Đen',
            path: './assets/music/Loving You Sunny - Kimmese_ Den.mp3',
            image: './assets/img/lovingyou.jpg'
        },
        {
            name: 'Mang Tiền Về Cho Mẹ',
            singer: 'Đen, Nguyên Thảo',
            path: './assets/music/Mang Tien Ve Cho Me - Den_ Nguyen Thao.mp3',
            image: './assets/img/mangtienvechome.jpg'
        },
        {
            name: 'Một Triệu Like',
            singer: 'Đen, Thành Đồng',
            path: './assets/music/Mot Trieu Like - Den_ Thanh Dong.mp3',
            image: './assets/img/mottrieulike.jpg'
        },
        {
            name: 'Mười Năm (Lộn Xộn 3)',
            singer: 'Đen, Ngọc Linh',
            path: './assets/music/Muoi Nam Lon Xon 3_ - Den_ Ngoc Linh.mp3',
            image: './assets/img/lonxon3.jpg'
        },
        {
            name: 'Ngày Khác Lạ',
            singer: 'Đen, Giang Phạm, Triple D',
            path: './assets/music/Ngay Khac La - Den_ Giang Pham_ Triple D.mp3',
            image: './assets/img/ngaykhacla.jpg'
        },
        {
            name: 'Ta Cứ Đi Cùng Nhau',
            singer: 'Đen, Linh Cáo',
            path: './assets/music/Ta Cu Di Cung Nhau - Den_ Linh Cao.mp3',
            image: './assets/img/tacudicungnhau.jpg'
        },
        {
            name: 'Ta Và Nàng',
            singer: 'Đen, JGKiD',
            path: './assets/music/Ta Va Nang - Den_ JGKiD.mp3',
            image: './assets/img/tavanang.jpg'
        },
        {
            name: 'Trạm Dừng Chân',
            singer: 'Kimmese, Đen',
            path: './assets/music/Tram Dung Chan - Kimmese_ Den.mp3',
            image: './assets/img/tramdungchan.jpg'
        },
        {
            name: 'Trời Hôm Nay Nhiều Mây Cực',
            singer: 'Đen',
            path: './assets/music/Troi Hom Nay Nhieu May Cuc_ - Den.mp3',
            image: './assets/img/troihomnaynhieumaycuc.jpg'
        },
        {
            name: 'Trốn Tìm',
            singer: 'Đen, MTV Band',
            path: './assets/music/Tron Tim - Den_ MTV Band.mp3',
            image: './assets/img/trontim.jpg'
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map(function (song, index) {
            return `
            <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
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
        playlist.innerHTML = htmls.join('\n')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth
        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 50000, //50s
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //Xử lý phóng to thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = (newCdWidth > 0) ? (newCdWidth + 'px') : ('0px')
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                {
                    audio.pause()
                }
            } else {
                audio.play()
            }
        }

        //Khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        //Khi bài hát dừng
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        //Xử lý khi tua bài hát
        progress.onchange = function (e) {
            // hoặc e.target.value = progress.value
            const seekTime = (e.target.value * audio.duration / 100)
            audio.currentTime = seekTime
        }
        //Khi next bài hát 
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //Khi prev bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //Khi random bài hát
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Khi repeat bài hát
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý next song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                //Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index) //vì dataset trả về kiểu dữ liệu string nên phải convert nó sang number
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                // Xử lý khi click vào song option
                if (e.target.closest('.option')) {

                }
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        //Gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe/ xử lý các sự kiện (DOM events)
        this.handleEvents()

        //Tải thông tin bài hát đầu tiên vào UI (giao diện) khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render()

        //Hiển thị trạng thái ban đầu của button repeat  & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()