module.exports = function (req, res, next) {
  var agent = require('superagent')

  var request = agent(req.method, req.url)

  Object.keys(req.headers).forEach(function (name) {
    request.set(name, req.headers[name])
  })

  request.query(req.query)

  if (req.body) request.send(req.body)

  // Define additional options
  defineOptions(req, request)

  return request.end(function (err, _res) {
    cb(err, adapter(res, _res))
  })
}

function adapter(res, _res, body) {
  // Expose the agent-specific response
  res.setOriginalResponse(_res)

  // Define recurrent HTTP fields
  res.setStatus(_res.statusCode)
  res.setStatusText(_res.statusText)
  res.setHeaders(_res.headers)

  // Define body, if present
  if (_res.body) res.setBody(_res.body)

  return res
}

function defineOptions(req, request) {
  var agentOpts = req.agentOpts

  if (+agentOpts.timeout) {
    request.timeout(agentOpts.timeout)
  }

  if (agentOpts.withCredentials) {
    request.withCredentials()
  }
}
