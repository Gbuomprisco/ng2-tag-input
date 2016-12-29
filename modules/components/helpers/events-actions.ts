/**
 * @name customSeparatorKeys
 * @param $event
 */
export function customSeparatorKeys($event) {
    if (this.separatorKeys.indexOf($event.keyCode) >= 0) {
        $event.preventDefault();
        this.addItem();
    }
}

/**
 * @name backSpaceListener
 * @param $event
 */
export function backSpaceListener($event) {
    const itemsLength: number = this.items.length,
        inputValue: string = this.inputForm.value.value,
        isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;

    if (isCorrectKey && !inputValue && itemsLength) {
        this.tags.last.select.call(this.tags.last);
    }
}

/**
 * @name addListener
 * @param listenerType
 * @param action
 * @param condition
 */
export function addListener(listenerType: string, action: () => any, condition = true): void {
    // if the event provided does not exist, throw an error
    if (!this.listeners.hasOwnProperty(listenerType)) {
        throw new Error('The event entered may be wrong');
    }

    // if a condition is present and is false, exit early
    if (!condition) {
        return;
    }

    // fire listener
    this.listeners[listenerType].push(action);
}

/**
 * @name getMatchingItems
 * @param value
 * @returns {string[]}
 */
function getMatchingItems(value: string): string[] {
    if (!value && !this.showDropdownIfEmpty) {
        return [];
    }

    const itemsMatching: string[] = [];
    const items = this.autocompleteItems;
    const lowercaseValue = value.toLowerCase();

    items.forEach(item => {
        const condition = item.toLowerCase().indexOf(lowercaseValue) >= 0 && this.items.indexOf(item) === -1;

        if (condition) {
            itemsMatching.push(item);
        }
    });

    return itemsMatching;
}

export function autoCompleteListener(ev): void {
    const value: string = this.inputForm.value.value;
    const position: ClientRect = this.inputForm.getElementPosition();
    const key = ev.keyCode;
    const itemsMatching = getMatchingItems.call(this, value);

    this.itemsMatching = itemsMatching;

    if (itemsMatching.length || (this.showDropdownIfEmpty && !value)) {
        const focus = key === 40 ? true : false;
        this.dropdown.dropdown.show(position, focus);
    }

    if (!itemsMatching.length && this.dropdown.isVisible) {
        this.dropdown.dropdown.hide();
    }
}

/**
 * @name onAutocompleteItemClicked
 * @param item
 */
export function onAutocompleteItemClicked(item): void {
    if (!item) {
        return;
    }

    // add item
    this.setInputValue(item.value);
    this.addItem(true);
    this.focus();

    // hide dropdown
    this.dropdown.dropdown.hide();
}
