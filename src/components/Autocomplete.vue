<template>
    <div class="autocomplete">
        <input
                ref="input"
                class="autocomplete__input"
                type="text"
                v-model="searchTerm"
        >
        <button
                class="autocomplete__button autocomplete__button__clear"
                @click="onClear"
                v-if="searchTerm.length > 0"
        >
            ✖
        </button>
        <button
                :class="['autocomplete__button', 'autocomplete__button__toggle']"
        >
            ▼
        </button>
        <ul
                class="autocomplete__dropdown"
                tabindex="-1">
            <template v-if="filteredOptions.length > 0">
                <li
                        v-for="option in filteredOptions"
                        :key="option.id"
                        @click="onSelect(option)"
                        tabindex="-1"
                >
                    {{option.name}}
                </li>
            </template>
            <template v-else>
                <li>
                    No results found
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {IOption} from "@/helpers/ioption";

    @Component
    export default class Autocomplete extends Vue {
        $refs!: {
            input: HTMLFormElement
        };

        private searchTerm = '';
        private choice: IOption | null = null;

        @Prop()
        private value: IOption | null = null;

        @Prop()
        private options!: Array<IOption>;

        @Watch('value')
        async onValueChanged(value: IOption | null): Promise<void> {
            this.choice = value;
        }

        @Watch('choice')
        onChoiceChanged(value: IOption | null): void {
            this.searchTerm = value !== null ? value.name: '';
        }

        get filteredOptions(): Array<IOption> {
            let searchTermLowerCase = this.searchTerm.toLowerCase();
            return searchTermLowerCase.length === 0 ? this.options : this.options.filter(option => {
                return option.name.toLowerCase().startsWith(searchTermLowerCase);
            });
        }

        onSelect(option: IOption): void {
            this.choice = option;
            this.$emit("input", this.choice);
        }

        onClear(): void {
            this.searchTerm = '';
            this.$refs.input.focus();
        }
    }
</script>

<style scoped lang="scss">
    .autocomplete {
        position: relative;
        display: flex;
        align-items: center;
        border: 1px solid var(--border-color);
        background-color: var(--input-color);
        border-radius: var(--border-radius-md);

        &:focus-within {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: unset;

            .autocomplete__dropdown {
                display: block;
            }

            .autocomplete__button__toggle {
                transform: rotate(180deg);
            }
        }
    }

    .autocomplete__button {
        color: var(--text-color);
        cursor: pointer;
        font-size: 0.8em;
        padding: 0 var(--padding-sm);
        flex-grow: 0;
        outline: none;
        background: transparent;
        border: none;
        line-height: 1;
    }

    .autocomplete__button__toggle {
        transition: transform var(--transition-duration-quick) ease-out;
    }

    .autocomplete__input {
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--text-color);
        font-size: inherit;
        padding: var(--padding-sm) var(--padding-md);
        flex-grow: 1;
        width: 100%;
    }

    .autocomplete__dropdown {
        display: none;
        position: absolute;
        top: calc(100% - 1px);
        z-index: 1;
        right: auto;
        left: auto;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        list-style: none;
        text-align: start;
        padding-inline-start: 0;
        background-color: var(--input-color);
        border: 1px solid var(--border-color);
        margin: 0;
        max-height: 200px;
        border-top: none;
        border-radius: var(--border-radius-md);
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        li {
            padding: 2px 4px;
            width: 100%;
            cursor: pointer;

            &:hover {
                background-color: var(--shadow-color);
            }
        }
    }

    .dropdown-enter-active, .dropdown-leave-active {
        transition: max-height var(--transition-duration-quick) ease-out;
    }

    .dropdown-enter, .fade-leave-to {
        max-height: 0;
    }
</style>
