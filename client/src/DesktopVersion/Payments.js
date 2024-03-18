import './css/img/main_img.jpg'

export default function Payments () {
    return (
        <>
            <div class="main" style={{position: "relative", top: '5em'}}>
                <div class="donate">
                    <div class="photo___" />
                    <div>
                        <h3>Вы можете помочь нашиму приюту пожертвованиями</h3>
                        Мы всегда готовы принять пожертвования на любую сумму. Вы можете отправить деньги по следующим реквизитам: <br />
                        <b>Сбер </b>xxxx xxxx xxxx xxxx <br />
                        <b>Альфа банк </b>xxxx xxxx xxxx xxxx <br />
                        <b>PSN </b>ChronicPainter
                    </div>
                </div>

                <div class="donate" style={{ marginTop: "1em"}} >
                    
                    <div>
                        <h3>Материальные пожертвования</h3>
                        Если вы не можете пожертвовать деньги, то вы всегда можете пожертвовать корма, тёплые вещи и прочее.<br />
                        <b>Телефон </b>8 (9xx) xxx - xx - xx <br />
                        Карта: школьная
                    </div>
                    <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A8879413460098698ec92d5e4b2f09d9841dc38383ac170c906ec7ebe55669642&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script>
                </div>
            </div>
        </>
    )
}