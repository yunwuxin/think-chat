<?php

namespace app\controller;

use app\BaseController;
use Iterator;
use think\ai\Client;
use think\Response;

class Chat extends BaseController
{
    public function index()
    {
        $client = new Client(env('AI_TOKEN'));

        $tools = [
            [
                'type'   => 'plugin',
                'plugin' => [
                    'name' => 'zPdyP7bQ',
                    'tool' => 'webSearch',
                ],
            ], //智谱搜索
            [
                'type'   => 'plugin',
                'plugin' => [
                    'name' => 'l9av2maG',
                    'tool' => 'jimeng',
                ],
            ],//文生图
        ]; //可用插件 可以通过 $client->plugin()->list() 获取后展示给用户  由用户在前端选择后传入，这里演示写入固定值

        $result = $client->responses()->create([
            'model'        => 'glm-4.5',
            'instructions' => '你是一个AI助理',
            'input'        => $this->request->param('input'),
            'previous_id'  => $this->request->param('previous_id'),
            'tools'        => $tools,
        ]);

        return new class ($result) extends Response {
            public function __construct(protected Iterator $iterator)
            {
                $this->header([
                    'Content-Type'      => 'text/event-stream',
                    'Cache-Control'     => 'no-cache, must-revalidate',
                    'X-Accel-Buffering' => 'no',
                ]);
            }

            protected function sendData(string $data): void
            {
                foreach ($this->iterator as $item) {
                    //如果需要保存消息到数据库可以在这里拼接后存储或者在上面增加一层迭代器处理
                    echo 'data: ' . json_encode($item) . "\n\n";
                    ob_flush();
                    flush();
                }
                echo "data: [DONE]\n\n";
            }
        };
    }
}
