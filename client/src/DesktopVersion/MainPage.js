import './css/style.css'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function MainPage () {
    const n = getRandomInt(5) + 1;
    return (
        <>
            <div class="head">
                <div class="header"></div>
                <div class="menu"></div>
            </div>
            <div class="main">
                <div class="img_on_main">
                    <h2>Приют для домашних животных "Приют"</h2>
                    Мы заботимся о братьях наших меньших
                </div>
                <div class = "about_us">
                    <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A8879413460098698ec92d5e4b2f09d9841dc38383ac170c906ec7ebe55669642&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
                    <div>
                        <h3>О приюте</h3>
                        Наш приют уже {n} лет заботится о бездобных животных по городу Ижевску. Мы стараемся обеспеить каждого подопечного теплом, кормом и любовью. <br />
                        Мы находимся по <b>адресу</b>: xxxxxx
                    </div>
                </div>
            </div>
        </>
    )
}