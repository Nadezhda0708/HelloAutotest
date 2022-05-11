//require("selenium-webdriver") это сторонняя библиотека
const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const { until } = require("selenium-webdriver");
const { TimeoutError } = require("selenium-webdriver/lib/error");


async function example() {

    //--Создаю и настраиваю WebDriver
    /*let driver Создаем переменную driver
    new Builder() Начинаем создавать экземпляр WebDriver. await означает дождаться выполнения асинхронной функции
    .forBrowser("chrome") Настраивает целевой браузер для клиентов, созданных этим экземпляром
    .build() Создает клиент WebDriver на основе конфигурации*/
    let driver = await new Builder().forBrowser("chrome").build();
    //Разворачиваю браузер в полноэкранный режим
    await driver.manage().window().maximize()
        //--

    //Перехожу на страницу:
    await driver.get("https://b2b.warm-on.ru/");

     //Жду 2 секунд чтобы загрузилась страница
     await driver.sleep(1000)

    //Скрол вниз
    await driver.executeScript("window.scrollTo(0, 1000)");

    //--Ищу по тексту
    //Переменной text присваиваю текст для поиска
    await clickOnWebComponent(driver,"Стать партнером",1000);
    
    

    //Жду 5 секунд чтобы загрузилась страница
    await driver.sleep(1000)

    //Перехожу на страницу:
    await driver.get("https://b2b.warm-on.ru/");

    //Жду 2 секунд чтобы загрузилась страница
    await driver.sleep(1000)

    await clickOnWebComponent(driver,"Вход",1000);

     //Жду 2 секунд чтобы загрузилась страница
     await driver.sleep(2000)

    //Беру заголовок и сохраняю в переменную title
    var title = await driver.getTitle();
    //Вывожу в терминал значение переменной title
    console.log('Title is:', title);

    //Завершает сеанс браузера
    await driver.quit();

}

example()

async function clickOnWebComponent(driver,text,timeout) {
    //Переменной topMenu присваиваю результат поиска по переменной text (результат будет WebElement)
    const webElement = driver.wait(
        //Ищет пока элемент не будет найден или
        until.elementLocated(By.xpath("//*[contains(text(), '" + text + "')]")),
        timeout
    );

    //--Выполняю клик по WebElement-у
    const actions = driver.actions({ async: true });
    await actions.click(webElement).perform();
    //--
}
