<template>
    <div class="autocomplete">
        <input
                class="autocomplete__input"
                type="text"
                :value.sync="searchTerm"
                @input="onFilter($event.target.value)"
        >
        <button
                class="autocomplete__button"
                @click="onClear"
        >
            X
        </button>
        <ul class="autocomplete__dropdown">
            <li
                    v-for="option in filteredOptions"
                    :key="option.id"
                    @click="onSelect(option)"
                    tabindex="-1"
            >
                {{option.name}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {IOption} from "@/helpers/ioption";

    @Component
    export default class Autocomplete extends Vue {
        private searchTerm = '';

        @Prop()
        private options!: Array<IOption>;

        get filteredOptions(): Array<IOption> {
            let searchTermLowerCase = this.searchTerm.toLowerCase();
            return searchTermLowerCase.length === 0 ? this.options : this.options.filter(option => {
                return option.name.toLowerCase().includes(searchTermLowerCase);
            });
        }

        onSelect(option: IOption): void {
            this.searchTerm = option.name;
            this.$emit("change", option);
        }

        onFilter(searchTerm: string): void {
            this.searchTerm = searchTerm;
        }

        onClear(): void {
            this.searchTerm = '';
        }
    }
</script>

<style scoped lang="scss">
    .autocomplete {
        position: relative;
        display: inline-block;
        border: 1px solid var(--border-color);
        background-color: var(--input-color);

        &:focus-within {
            .autocomplete__dropdown {
                display: block;
            }
        }
    }

    .autocomplete__input {
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--text-color);
    }

    .autocomplete__button {
        background-color: transparent;
        color: var(--text-color);
        border: none;
        outline: none;
        cursor: pointer;
    }

    .autocomplete__dropdown {
        position: absolute;
        z-index: 1;
        right: auto;
        left: auto;
        width: 100%;
        display: none;
        list-style: none;
        text-align: start;
        padding-inline-start: 0;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
        margin: 0;
        max-height: 200px;

        li {
            padding: 2px 4px;
            width: 100%;
            cursor: pointer;

            &:hover {
                background-color: beige;
            }
        }
    }
</style>
