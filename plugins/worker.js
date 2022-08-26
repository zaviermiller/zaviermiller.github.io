import Worker from '~/assets/noise.worker.js'

export default (_, inject) => {
  inject('worker', {
    createWorker () {
      return new Worker()
    }
  })
}
