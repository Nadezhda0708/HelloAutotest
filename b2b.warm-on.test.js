const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const { until } = require("selenium-webdriver");
jest.setTimeout(10000);

let driver;

//Группирует тесты
describe('Тесты функционала https://b2b.warm-on.ru/', () => {
    //Перед всеми тестами выполняется 
    beforeAll(async() => {
        //--Создаю и настраиваю WebDriver
        /*let driver Создаем переменную driver
        new Builder() Начинаем создавать экземпляр WebDriver. await означает дождаться выполнения асинхронной функции
        .forBrowser("chrome") Настраивает целевой браузер для клиентов, созданных этим экземпляром
        .build() Создает клиент WebDriver на основе конфигурации*/
        driver = await new Builder().forBrowser("chrome").build();
        //Разворачиваю браузер в полноэкранный режим
        await driver.manage().window().maximize()
    }, 30000);

    //После всех тестов выполняется
    afterAll(async() => {
        await driver.quit();
    }, 40000);

    //Тест
    test('Должен придти к заголовку "Регистрация"', async() => {
        //Перехожу на страницу:
        await driver.get("https://b2b.warm-on.ru/");
        //Скролю до кнопки и нажимаю - "Стать партнером"
        await scrollAndClickOnWebComponent(driver, 3000, "Стать партнером");
        //Сохраняю заглавие страницы в переменную title 
        var title = await driver.getTitle();
        console.log()
        //Проверяю, что значение переменной title соответствует "Регистрация"
        expect(title).toEqual("Регистрация");
    });


    //Тест
    test('Должен придти к заголовку "Вход в личный кабинет"', async() => {
        //Перехожу на страницу:
        await driver.get("https://b2b.warm-on.ru/");
        //Скролю до кнопки и нажимаю - "Стать партнером"
        await scrollAndClickOnWebComponent(driver, 0, "Вход");
        //Сохраняю заглавие страницы в переменную title
        var title = await driver.getTitle();
        console.log()
            //Проверяю, что значение переменной title соответствует "Регистрация"
        expect(title).toEqual("Вход в личный кабинет");
    });

     //Тест
     test('Должен найти кнопку "Регистрация"', async() => {
        //Перехожу на страницу:
        await driver.get("https://b2b.warm-on.ru/");
        //Находим компонент по тексту, при нахождении проверим, что это ссылка
        //Ищем элемент по тексту в течении 5 сек.
        const element = driver.wait(
            //Ищет пока элемент не будет найден или
            until.elementLocated(By.xpath("//*[contains(text(), 'Регистрация')]")),
            // не пройдет 5 секунд
            5000
        );
        //console.log('DEBUG: ', await element.getAttribute('href'))
        const url = await element.getAttribute('href')
        //Проверяю, что значение переменной url соответствует реальной ссылке
        expect(url).toEqual("https://b2b.warm-on.ru/b2b-registration");
    });

    
            //Проверяю, что значение переменной title соответствует "Регистрация"
        
    });



//Функция
async function scrollAndClickOnWebComponent(driver, scroll, text) {

//Скролим вниз от 0 до +-
    await driver.executeScript("window.scrollTo(0, " + scroll + ")");
    //дошли вниз,ждем 2 секунды
    await driver.sleep(2000);
    
    //Ищем элемент по тексту в течении 5 сек.
    const element = driver.wait(
        //Ищет пока элемент не будет найден или
        until.elementLocated(By.xpath("//*[contains(text(), '" + text + "')]")),
        // не пройдет 5 секунд
        5000
    );

    //--Выполняю клик по WebElement-у
    const actions = driver.actions({ async: true });
    await actions.click(element).perform();
}