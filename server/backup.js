async function abc() {

    function loopData(value) {
        return new Promise((resolve) => {
            resolve(value)
        });
    }

    function isValid(url) {
        var regExp = /(?:https?:\/\/)?(?:[\w\-]+\.)*(?:drive|docs)\.google\.com\/(?:(?:open|uc)\?(?:[\w\-\%]+=[\w\-\%]*&)*id=|(?:folder|file)\/d\/|\/ccc\?(?:[\w\-\%]+=[\w\-\%]*&)*key=)([\w\-]{28,})/i;
        var match = url.match(regExp);
        if (!match) {
            return false;
        }
        return true;
    }

    async function processs() {
        for (var i = 0; i <= 37342; i++) {
            var valid = data.post.posts[i]
            if (!valid) {
                continue;
            }
            var title = data.post.posts[i].post.post_title,
                description = data.post.posts[i].post.post_content,
                thumbnail = data.post.posts[i].meta._thumbnail_url,
                type = data.post.posts[i].terms.post_tag[0],
                premiered = data.post.posts[i].terms.release_year[0],
                status = data.post.posts[i].terms.status[0],
                rating = data.post.posts[i].terms.rating[0],
                season = data.post.posts[i].terms.season[0],
                studios = data.post.posts[i].terms.animation_work[0]

            var anime = await Anime.create({ title, description, thumbnail, type, premiered, status, rating, season, studios })
            var anime_id = anime.anime_id
            var jp_title = data.post.posts[i].meta.title_japanese,
                cn_title = data.post.posts[i].meta.title_chinese,
                en_title = data.post.posts[i].meta.title_english,
                ko_title = data.post.posts[i].meta.title_korean
            if (jp_title) await AnimeMeta.create({ anime_id, meta_key: 'jp_title', meta_value: jp_title })
            if (cn_title) await AnimeMeta.create({ anime_id, meta_key: 'cn_title', meta_value: cn_title })
            if (en_title) await AnimeMeta.create({ anime_id, meta_key: 'en_title', meta_value: en_title })
            if (ko_title) await AnimeMeta.create({ anime_id, meta_key: 'ko_title', meta_value: ko_title })

            var genres = data.post.posts[i].terms.category

            console.log(i)
        async function LoopEpisode() {
            var promises = []
            var episodesEnglish = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=english`)).data
            var episodesChinese = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=chinese`)).data
            var episodesRaw = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=xx`)).data

            if (episodesEnglish.success && episodesEnglish.source) {
                for (var episode of episodesEnglish.source) {
                    var source = episode.url
                    if (!isValid(source)) {
                        source = episode.backup
                    }
                    var title = episode.title
                    var number = episode.number
                    var type = episode.source
                    var audio = episode.audio
                    var subtitle = episode.subtitle
                    var fansub = episode.group
                    var episodeCreate = await axios.post('http://localhost:8880/api/server/episode/post', {
                        anime_id, title, number, type, audio, subtitle, fansub, source
                    })
                    promises.push(loopData(episodeCreate))
                }
            }

            if (episodesChinese.success && episodesChinese.source) {
                for (var episode of episodesChinese.source) {
                    var source = episode.url
                    if (!isValid(source)) {
                        source = episode.backup
                    }
                    var title = episode.title
                    var number = episode.number
                    var type = episode.source
                    var audio = episode.audio
                    var subtitle = episode.subtitle
                    var fansub = 'Unknown'
                    var episodeCreate = await axios.post('http://localhost:8880/api/server/episode/post', {
                        anime_id, title, number, type, audio, subtitle, fansub, source
                    })
                    promises.push(loopData(episodeCreate))
                }
            }

            if (episodesRaw.success && episodesRaw.source) {
                for (var episode of episodesRaw.source) {
                    var source = episode.url
                    if (!isValid(source)) {
                        source = episode.backup
                    }
                    var title = episode.title
                    var number = episode.number
                    var type = episode.source
                    var audio = episode.audio
                    var subtitle = episode.subtitle
                    var fansub = 'Unknown'
                    var episodeCreate = await axios.post('http://localhost:8880/api/server/episode/post', {
                        anime_id, title, number, type, audio, subtitle, fansub, source
                    })
                    promises.push(loopData(episodeCreate))
                }
            }


            return Promise.all(promises)
        }

            async function LoopAction() {

                var term_id = []
                for (genre of genres) {
                    var valid = await Term.findOne({ type: 'genre', key: genre })
                    if (!valid) {
                        var term = await Term.create({ type: 'genre', key: genre })
                        term_id.push(term.term_id)
                    } else {
                        term_id.push(loopData(valid.term_id))
                    }

                }
                return Promise.all(term_id)
            }
            await LoopEpisode()
                .then(() => {
                    LoopAction().then(async (data) => {
                        return await AnimeMeta.create({ anime_id, meta_key: 'genre', meta_value: data })
                    })
                })
        }

        async function LoopEpisode() {
            var i = 34187
            var anime_id = '165b6cfede7a424f24b2605da1fdb31c'
            var promises = []
            var episodesEnglish = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=english&au=japanese`)).data
            // var episodesChinese = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=chinese&au=japanese`)).data
            // var episodesRaw = (await axios.get(`https://www.myanime.co/panel/admin-ajax.php?action=my_load_ajax_content&postid=${i}&sub=xx&au=japanese`)).data

            if (episodesEnglish.success && episodesEnglish.source) {
                for (var episode of episodesEnglish.source) {
                    var source = episode.url
                    if (!isValid(source)) {
                        source = episode.backup
                    }
                    var title = episode.title
                    var number = episode.number
                    var type = episode.source
                    var audio = episode.audio
                    var subtitle = episode.subtitle
                    var fansub = episode.group
                    var episodeCreate = await axios.post('http://localhost:8880/api/server/episode/post', {
                        anime_id, title, number, type, audio, subtitle, fansub, source
                    })
                    promises.push(loopData(episodeCreate))
                }
            }

            if (episodesChinese.success && episodesChinese.source) {
                for (var episode of episodesChinese.source) {
                    var source = episode.url
                    if (!isValid(source)) {
                        source = episode.backup
                    }
                    var title = episode.title
                    var number = episode.number
                    var type = episode.source
                    var audio = episode.audio
                    var subtitle = episode.subtitle
                    var fansub = 'Unknown'
                    var episodeCreate = await axios.post('http://localhost:8880/api/server/episode/post', {
                        anime_id, title, number, type, audio, subtitle, fansub, source
                    })
                    promises.push(loopData(episodeCreate))
                }
            }

            if (episodesRaw.success && episodesRaw.source) {
                for (var episode of episodesRaw.source) {
                    var source = episode.url
                    if (!isValid(source)) {
                        source = episode.backup
                    }
                    var title = episode.title
                    var number = episode.number
                    var type = episode.source
                    var audio = episode.audio
                    var subtitle = episode.subtitle
                    var fansub = 'Unknown'
                    var episodeCreate = await axios.post('http://localhost:8880/api/server/episode/post', {
                        anime_id, title, number, type, audio, subtitle, fansub, source
                    })
                    promises.push(loopData(episodeCreate))
                }
            }


            return Promise.all(promises)
        }
        await LoopEpisode().then((data) => {
            // console.log(data)
        })

    }
    processs()


}