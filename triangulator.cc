#include <node.h>
#include <string>
#include <sstream>

namespace triangulator {
	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::String;
	using v8::Number;
	using v8::Value;
	using v8::Context;

	void Method (const FunctionCallbackInfo<Value>&args) {
		Local<Context> context = args.GetIsolate()->GetCurrentContext();
		Isolate* isolate = args.GetIsolate();

		double length = args[0]->NumberValue(context).FromJust();
  		double width  = args[1]->NumberValue(context).FromJust();
  		double height = args[2]->NumberValue(context).FromJust();

		std::ostringstream lengthTmp;
		lengthTmp << length;
		std::string ltmp = lengthTmp.str();
		const char* lengthStr = ltmp.c_str();

		std::ostringstream negativeLengthTmp;
		negativeLengthTmp << length * -1;
		std::string nltmp = negativeLengthTmp.str();
		const char* negativeLengthStr = nltmp.c_str();

		std::ostringstream widthTmp;
		widthTmp << width;
		std::string wtmp = widthTmp.str();
		const char* widthStr = wtmp.c_str();

		std::ostringstream negativeWidthTmp;
		negativeWidthTmp << width * -1;
		std::string nwtmp = negativeWidthTmp.str();
		const char* negativeWidthStr = nwtmp.c_str();

		std::ostringstream heightTmp;
		heightTmp << height;
		std::string htmp = heightTmp.str();
		const char* heightStr = htmp.c_str();

		std::ostringstream negativeHeightTmp;
		negativeHeightTmp << height * -1;
		std::string nhtmp = negativeHeightTmp.str();
		const char* negativeHeightStr = nhtmp.c_str();
		
		std::string json = "[{\"x\":";
		json += nwtmp;
		json += ",\"y\":0,\"z\":";
		json += ltmp;
		json += "},";

		json += "{\"x\": ";
		json += wtmp;
		json += ", \"y\": 0, \"z\": ";
		json += ltmp;
		json += "},";

		json += "{\"x\": ";
		json += nwtmp;
		json += ", \"y\": ";
		json += htmp;
		json += ", \"z\": ";
		json += ltmp;
		json += "},";

		json += "{\"x\": ";
		json += wtmp;
		json += ", \"y\": ";
		json += htmp;
		json += ", \"z\": ";
		json += ltmp;
		json += "},";

		json += "{\"x\": ";
		json += nwtmp;
		json += ", \"y\": 0";
		json += ", \"z\": ";
		json += nltmp;
		json += "},";

		json += "{\"x\": ";
		json += wtmp;
		json += ", \"y\": 0";
		json += ", \"z\": ";
		json += nltmp;
		json += "},";

		json += "{\"x\": ";
		json += nwtmp;
		json += ", \"y\": ";
		json += htmp;
		json += ", \"z\": ";
		json += nltmp;
		json += "},";

		json += "{\"x\": ";
		json += wtmp;
		json += ", \"y\": ";
		json += htmp;
		json += ", \"z\": ";
		json += nltmp;
		json += "}]";

		const char *fullJson = json.c_str();

		auto test = String::NewFromUtf8(isolate, fullJson, v8::String::kNormalString);
		args.GetReturnValue().Set(test);
	}

	void Initialize (Local<Object> exports) {
		NODE_SET_METHOD(exports, "triangulate", Method);
	}

	NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
}