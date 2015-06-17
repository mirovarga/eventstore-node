var events = {};
var handlers = {};

exports.add = function (stream, event, payload) {
  var e = {
    event: event,
    payload: payload,
    timestamp: Date.now()
  };

  storeEvent(stream, e);
  handleEvent(e);
};

exports.all = function (stream) {
  return events[stream] || [];
};

exports.on = function (event, handler) {
  handlers[event] = handlers[event] || [];
  handlers[event].push(handler);
};

function storeEvent(stream, event) {
  events[stream] = events[stream] || [];
  events[stream].push(event);
}

function handleEvent(event) {
  var hs = handlers[event.event] || [];
  for (var i = 0; i < hs.length; i++)
    hs[i](event);
}
