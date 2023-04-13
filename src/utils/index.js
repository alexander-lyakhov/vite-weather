import { reactive } from 'vue'
// import { notify  } from "@kyvg/vue3-notification"

export const flags = reactive({
  isLoading: false
})

export const showError = (e) => {
  /*
  notify({
    title: e.status ? `Error ${e.status}`:'',
    text: e.statusText,
    type: 'error',
    duration: 5000
  })
  */
}

export default {
  flags,
  showError
}