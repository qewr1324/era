export function generate(params: any): string {
	return `platform :ios, '15.0'
use_frameworks!

target 'MyApp' do
  pod 'Alamofire', '~> 5.8'
  pod 'Kingfisher', '~> 7.0'
  pod 'RealmSwift', '~> 10.45'
  pod 'RxSwift', '~> 6.6'
  
  target 'MyAppTests' do
    inherit! :search_paths
    pod 'Quick', '~> 7.0'
    pod 'Nimble', '~> 12.0'
  end
end`;
}
