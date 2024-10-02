import axios from 'axios';


const http = axios.create({
    baseURL: import.meta.env.VITE_REMOTE_API
    });

export default {
    getEvents() {
        return http.get('/events');
    },
    // getEvent(id) {
    //     return http.get(`/events/${id}`);
    // },
    // addEvent(event) {
    //     return http.post('/events', event);
    // },
    // updateEvent(event) {
    //     return http.put(`/events/${event.id}`, event);
    // },
    // deleteEvent(id) {
    //     return http.delete(`/events/${id}`);
    // }

}
