import {browser, by, element} from "protractor";

export class WebClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ot-root h1')).getText();
  }
}
