import type { InjectionKey, Ref } from "vue"

export const QUERY_FORM_MODEL_KEY: InjectionKey<Ref<Record<string, unknown>>> = Symbol("query-form-model")
